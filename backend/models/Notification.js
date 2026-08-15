import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    recipientId: { type: String, required: true, index: true },
    senderId: { type: String, default: '' },
    senderName: { type: String, default: '' },
    type: {
      type: String,
      enum: ['message', 'product', 'system'],
      default: 'message',
    },
    message: { type: String, required: true },
    conversationId: { type: String, default: '' },
    productId: { type: String, default: '' },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Notification || mongoose.model('Notification', notificationSchema);
