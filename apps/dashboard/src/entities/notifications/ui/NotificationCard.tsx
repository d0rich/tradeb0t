import type { Notification } from '../model/Notification'

export interface NotificationCardProps {
  notification: Notification
  className?: string
  onClose?: (notification: Notification) => void
}

function getTwoDigitString(number: number) {
  return number < 10 ? `0${number}` : `${number}`
}

function getTimeString(date: Date) {
  return `${getTwoDigitString(date.getHours())}:${getTwoDigitString(date.getMinutes())}:${getTwoDigitString(
    date.getSeconds()
  )}`
}

export default function NotificationCard({ notification, className = '', onClose }: NotificationCardProps) {
  const variantClass =
    notification.type === 'info' ? 'alert-info' : notification.type === 'success' ? 'alert-success' : 'alert-error'

  return (
    <div className={`alert ${variantClass} flex-row ${className}`}>
      <div className="block">
        <time className="text-xs">{getTimeString(notification.createdAt)}</time>
        <div>{notification.content}</div>
      </div>
      <div className="flex-none">
        <button
          onClick={() => {
            if (onClose) onClose(notification)
          }}
          className="btn btn-sm"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
