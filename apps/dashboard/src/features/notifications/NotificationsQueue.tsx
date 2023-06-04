import { memo, useCallback } from 'react'

import NotificationCard from '@/src/entities/notifications/ui/NotificationCard'
import { useAppSelector, useAppDispatch } from '@/src/shared/hooks'
import { removeNotification } from '@/src/shared/model/notificationsSlice'
import { Notification } from '@/src/shared/model/Notification'

const NotificationCardMemo = memo(NotificationCard)

export default function NotificationsQueue() {
  const notifications = useAppSelector((state) => state.notifications.notifications)
  const dispatch = useAppDispatch()

  const closeNotification = useCallback((notification: Notification) => {
    dispatch(removeNotification(notification.createdAt))
  }, [])

  return (
    <>
      {notifications.map((notification) => (
        <NotificationCardMemo
          key={Number(notification.createdAt)}
          notification={notification}
          onClose={closeNotification}
        />
      ))}
    </>
  )
}
