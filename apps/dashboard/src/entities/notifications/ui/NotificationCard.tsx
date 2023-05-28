import type { Notification } from '../model/Notification'

export interface NotificationCardProps {
  notification: Notification
  className?: string
}

export default function NotificationCard({ notification, className }: NotificationCardProps) {
  const variantClass =
    notification.type === 'info' ? 'alert-info' : notification.type === 'success' ? 'alert-success' : 'alert-error'
  return (
    <div className={`alert ${variantClass} ${className}`}>
      <div>
        <div className="text-xs">{notification.createdAt.toString()}</div>
        <div>{notification.content}</div>
      </div>
    </div>
  )
}
