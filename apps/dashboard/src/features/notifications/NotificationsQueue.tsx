import NotificationCard from '@/src/entities/notifications/ui/NotificationCard'
import { useAppSelector, useAppDispatch } from '@/src/shared/model/hooks'
import { removeNotification } from '@/src/entities/notifications/model/notificationsSlice'

export default function NotificationsQueue() {
  const notifications = useAppSelector((state) => state.notifications.notifications)
  const dispatch = useAppDispatch()

  return (
    <>
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.createdAt.toISOString()}
          notification={notification}
          onClose={(notification) => dispatch(removeNotification(notification.createdAt))}
        />
      ))}
    </>
  )
}
