import type { Notification } from '@/src/shared/model/Notification'

export type NotificationToPush = Omit<Notification, 'createdAt'>
