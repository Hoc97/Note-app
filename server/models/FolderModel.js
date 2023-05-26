import mongoose, { Schema } from 'mongoose';

const folderShema = new Schema({
    name: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true
    },
}, { timestamps: true });
// timestamps => createdAt,updatedAt

const FolderModel = mongoose.model('Folder', folderShema);
export default FolderModel;