import mongoose, { Schema } from 'mongoose';

const noteShema = new Schema({
    content: {
        type: String
    },
    folderId: {
        type: String,
        required: true
    },
}, { timestamps: true });
// timestamps => createdAt,updatedAt

const NoteModel = mongoose.model('Note', noteShema);
export default NoteModel;