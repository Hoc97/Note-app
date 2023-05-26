import express from 'express';
import http from 'http';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import bodyParser from 'body-parser';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config.js';
import './firebaseConfig.js';
import { getAuth } from 'firebase-admin/auth';
import { typeDefs } from './schemas/schemas.js';
import { resolvers } from './resolver/resolver.js';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

const app = express();
const httpServer = http.createServer(app);

//Connect to DB
const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.bgohlym.mongodb.net/?retryWrites=true&w=majority`;

const PORT = process.env.PORT || 4000;

const schema = makeExecutableSchema({ typeDefs, resolvers });

// Creating the WebSocket server
const wsServer = new WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Pass a different path here if app.use
    // serves expressMiddleware at a different path
    path: '/graphql',
});

// Hand in the schema we just created and have the
// WebSocketServer start listening.
const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
    schema,
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        {
            async serverWillStart() {
                return {
                    async drainServer() {
                        await serverCleanup.dispose();
                    },
                };
            },
        },
    ]
});

await server.start();

const authorizationJWT = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
        const accessToken = authorizationHeader.split(" ")[1];
        getAuth().verifyIdToken(accessToken)
            .then(decodedToken => {
                res.locals.uid = decodedToken.uid;
                next();
            })
            .catch(err => {
                console.log(err);
                return res.status(403).json({ status: 403, message: 'Forbidden', error: err });
            });
    } else {
        next();
        // return res.status(401).json({ status: 401, message: 'Unauthorized' });
    }

};

app.use(cors(), authorizationJWT, bodyParser.json(), expressMiddleware(server, {
    context: async ({ req, res }) => {
        return { uid: res.locals.uid };
    }
}));

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    console.log(">>>>>>>>>>>>>>>>>>>   Database connected");
    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log('>>>>>>>>>>>>>>>>>>>   Server ready at http://localhost:4000');
}).catch(err => console.log(err));

