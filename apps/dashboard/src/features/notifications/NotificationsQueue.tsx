import NotificationCard from '@/src/entities/notifications/ui/NotificationCard'
import { useAppSelector } from '@/src/shared/model/hooks'

export default function NotificationsQueue() {
  const notifications = useAppSelector((state) => state.notifications.notifications)

  return (
    <>
      {notifications.map((notification) => (
        <NotificationCard key={notification.createdAt.toISOString()} notification={notification} />
      ))}
    </>
  )
}
