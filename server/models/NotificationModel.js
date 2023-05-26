import mongoose, { Schema } from 'mongoose';

const notificationShema = new Schema({
    content: {
        type: String
    }
}, { timestamps: true });
// timestamps => createdAt,updatedAt

const NotificationModel = mongoose.model('Notification', notificationShema);
export default NotificationModel;