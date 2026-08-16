import asyncHandler from '../utils/asyncHandler.js';
import Notification from '../models/Notification.js';

export const getNotifications = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, unreadOnly } = req.query;
  const query = { userId: req.user._id };
  if (unreadOnly === 'true') query.isRead = false;

  const notifications = await Notification.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  const unreadCount = await Notification.countDocuments({ userId: req.user._id, isRead: false });

  res.status(200).json({ notifications, unreadCount });
});

export const markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findOne({ _id: req.params.id, userId: req.user._id });
  if (!notification) {
    return res.status(404).json({ message: 'Notification not found' });
  }

  notification.isRead = true;
  await notification.save();

  res.status(200).json({ message: 'Notification marked as read', notification });
});

export const markAllAsRead = asyncHandler(async (req, res) => {
  await Notification.updateMany({ userId: req.user._id, isRead: false }, { isRead: true });
  res.status(200).json({ message: 'All notifications marked as read' });
});

export const deleteNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.findOne({ _id: req.params.id, userId: req.user._id });
  if (!notification) {
    return res.status(404).json({ message: 'Notification not found' });
  }

  await notification.deleteOne();
  res.status(200).json({ message: 'Notification deleted' });
});
