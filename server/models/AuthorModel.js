import mongoose, { Schema } from 'mongoose';

const authorShema = new Schema({
    uid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
}, { timestamps: true });
// timestamps => createdAt,updatedAt

const AuthorModel = mongoose.model('Author', authorShema);
export default AuthorModel;