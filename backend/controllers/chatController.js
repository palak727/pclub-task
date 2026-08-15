import Message from '../models/Message.js';
import { isMemoryMode, memoryStore } from '../store/memoryStore.js';

export const buildConversationId = (userA, userB, productId = '') => {
  const users = [String(userA), String(userB)].sort().join('_');
  return productId ? `${users}_${productId}` : users;
};

export const saveMessage = async (msgData) => {
  const { conversationId, senderId, senderName, receiverId, productId, text } = msgData;

  if (isMemoryMode()) {
    const newMsg = {
      _id: `msg-${Date.now()}`,
      id: `msg-${Date.now()}`,
      conversationId,
      senderId: String(senderId),
      senderName,
      receiverId: String(receiverId),
      productId: productId || '',
      text,
      read: false,
      createdAt: new Date(),
    };
    memoryStore.messages.push(newMsg);
    return newMsg;
  }

  return Message.create({
    conversationId,
    senderId: String(senderId),
    senderName,
    receiverId: String(receiverId),
    productId: productId || '',
    text,
    read: false,
  });
};

export const getUserConversations = async (req, res) => {
  const userId = String(req.user.id || req.user._id);

  const mapConversation = (items) => {
    const threads = new Map();

    items.forEach((m) => {
      const conversationId = m.conversationId;
      const isSender = String(m.senderId) === userId;
      const otherUserId = isSender ? String(m.receiverId) : String(m.senderId);
      const otherUserName = isSender ? (m.receiverName || 'IITKian') : m.senderName;

      const current = threads.get(conversationId) || {
        conversationId,
        otherUserId,
        otherUserName,
        productId: m.productId || '',
        lastMessage: m.text,
        updatedAt: m.createdAt || new Date(),
        unread: false,
      };

      if (new Date(m.createdAt || new Date()) > new Date(current.updatedAt || new Date())) {
        current.lastMessage = m.text;
        current.updatedAt = m.createdAt || new Date();
      }

      current.productId = m.productId || current.productId;
      current.otherUserId = otherUserId;
      current.otherUserName = current.otherUserName || otherUserName;
      current.unread = current.unread || (!m.read && String(m.receiverId) === userId);
      threads.set(conversationId, current);
    });

    return Array.from(threads.values()).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  };

  if (isMemoryMode()) {
    const list = memoryStore.messages.filter(
      (m) => String(m.senderId) === userId || String(m.receiverId) === userId
    );
    return res.json(mapConversation(list));
  }

  try {
    const list = await Message.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    }).sort({ createdAt: -1 });

    return res.json(mapConversation(list));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getConversationMessages = async (req, res) => {
  const { conversationId } = req.params;

  if (isMemoryMode()) {
    const list = memoryStore.messages.filter((m) => m.conversationId === conversationId);
    return res.json(list);
  }

  try {
    const list = await Message.find({ conversationId }).sort({ createdAt: 1 });
    return res.json(list);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUnreadCount = async (req, res) => {
  const userId = String(req.user.id || req.user._id);

  if (isMemoryMode()) {
    const count = memoryStore.messages.filter(
      (m) => String(m.receiverId) === userId && !m.read
    ).length;
    return res.json({ count });
  }

  try {
    const count = await Message.countDocuments({ receiverId: userId, read: false });
    return res.json({ count });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const markAsRead = async (req, res) => {
  const { conversationId } = req.params;
  const userId = String(req.user.id || req.user._id);

  if (isMemoryMode()) {
    memoryStore.messages.forEach((m) => {
      if (m.conversationId === conversationId && String(m.receiverId) === userId) {
        m.read = true;
      }
    });
    return res.json({ success: true });
  }

  try {
    await Message.updateMany(
      { conversationId, receiverId: userId, read: false },
      { $set: { read: true } }
    );
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};