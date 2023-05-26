import { AuthorModel, FolderModel, NoteModel, NotificationModel } from '../models/index.js';
import { GraphQLScalarType } from 'graphql';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

export const resolvers = {
    Date: new GraphQLScalarType({
        name: 'Date',
        parseValue(value) {
            return new Date(value);
        },
        serialize(value) {
            return value.toISOString();
        }
    }),
    Query: {
        folders: async (parent, args, context) => {
            const folders = await FolderModel.find({ authorId: context.uid }).sort({ updatedAt: 'desc' });
            return folders;
        },
        folder: async (parent, args) => {
            const folderId = args.folderId;
            const foundFolder = await FolderModel.findById(folderId);
            return foundFolder;
        },
        note: async (parent, args) => {
            const noteId = args.noteId;
            const foundNote = await NoteModel.findById(noteId);
            return foundNote;
        }
    },
    // hàng này có nghĩa khi gặp field 'authors' trong Folders thì sẽ xử lý như này
    Folder: {
        author: async (parent, args, context) => {
            const author = await AuthorModel.findOne({ uid: parent.authorId });
            return author;
        },
        notes: async (parent, args) => {
            // parent: lấy toàn bộ data từ cha xuống con
            const folderId = parent.id;
            const notes = await NoteModel.find({ folderId: folderId });
            return notes;
        },
    },
    Mutation: {
        addFolder: async (parent, args, context) => {
            const newFolder = new FolderModel({ ...args, authorId: context.uid });
            pubsub.publish('FOLDER_CREATED', {
                folderCreated: {
                    message: 'A new folder created'
                }
            });
            await newFolder.save();
            return newFolder;
        },
        addNote: async (parent, args) => {
            const newNote = new NoteModel(args);
            await newNote.save();
            return newNote;
        },
        updateNote: async (parent, args) => {
            const noteId = args.id;
            const updateNote = await NoteModel.findByIdAndUpdate(noteId, args);
            return updateNote;
        },
        register: async (paren, args) => {
            const foundUser = await AuthorModel.findOne({ uid: args.uid });

            if (!foundUser) {
                const newUser = new AuthorModel(args);
                await newUser.save();
                return newUser;
            }
            return foundUser;
        },
        pushNotification: async (parent, args) => {
            const newNotification = new NotificationModel(args);
            pubsub.publish('PUSH_NOTIFICATION', {
                notification: {
                    message: args.content
                }
            });
            await newNotification.save();
            return { message: 'SUCCESS' };
        }
    },
    Subscription: {
        folderCreated: {
            // Example using an async generator
            subscribe: () => pubsub.asyncIterator(['FOLDER_CREATED']),
        },
        notification: {
            // Example using an async generator
            subscribe: () => pubsub.asyncIterator(['PUSH_NOTIFICATION']),
        },
    },
};