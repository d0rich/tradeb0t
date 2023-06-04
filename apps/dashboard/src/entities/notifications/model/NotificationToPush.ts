import type { Notification } from '@/src/entities/notifications/model/Notification'

export type NotificationToPush = Omit<Notification, 'createdAt'>
