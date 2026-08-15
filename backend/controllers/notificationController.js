import Notification from '../models/Notification.js';
import { isMemoryMode, memoryStore } from '../store/memoryStore.js';

export const createNotification = async ({
  recipientId,
  senderId = '',
  senderName = '',
  type = 'message',
  message,
  conversationId = '',
  productId = '',
}) => {
  const payload = {
    recipientId: String(recipientId),
    senderId: String(senderId),
    senderName,
    type,
    message,
    conversationId,
    productId,
    read: false,
    createdAt: new Date(),
  };

  if (isMemoryMode()) {
    memoryStore.notifications.push({
      _id: `notif-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      ...payload,
    });
    return payload;
  }

  const doc = await Notification.create(payload);
  return doc.toObject();
};

export const getNotifications = async (req, res) => {
  const userId = req.user.id || req.user._id;

  if (isMemoryMode()) {
    const items = memoryStore.notifications
      .filter((n) => String(n.recipientId) === String(userId))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return res.json(items);
  }

  try {
    const items = await Notification.find({ recipientId: userId }).sort({ createdAt: -1 });
    return res.json(items);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const markNotificationRead = async (req, res) => {
  const userId = req.user.id || req.user._id;
  const { id } = req.params;

  if (isMemoryMode()) {
    const item = memoryStore.notifications.find(
      (n) => String(n._id) === String(id) && String(n.recipientId) === String(userId)
    );
    if (!item) return res.status(404).json({ message: 'Notification not found' });
    item.read = true;
    return res.json({ success: true, notification: item });
  }

  try {
    const item = await Notification.findOneAndUpdate(
      { _id: id, recipientId: userId },
      { $set: { read: true } },
      { new: true }
    );

    if (!item) return res.status(404).json({ message: 'Notification not found' });
    return res.json({ success: true, notification: item });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUnreadNotificationCount = async (req, res) => {
  const userId = req.user.id || req.user._id;

  if (isMemoryMode()) {
    const count = memoryStore.notifications.filter(
      (n) => String(n.recipientId) === String(userId) && !n.read
    ).length;
    return res.json({ count });
  }

  try {
    const count = await Notification.countDocuments({ recipientId: userId, read: false });
    return res.json({ count });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
