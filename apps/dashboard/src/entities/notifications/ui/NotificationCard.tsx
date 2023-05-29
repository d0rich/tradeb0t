import { useEffect, useRef } from 'react'
import type { Notification } from '../model/Notification'

export interface NotificationCardProps {
  notification: Notification
  className?: string
  onClose?: (notification: Notification) => void
}

function getTwoDigitString(number: number) {
  return number < 10 ? `0${number}` : `${number}`
}

function getTimeString(dateAsNumber: number) {
  const date = new Date(dateAsNumber)
  return `${getTwoDigitString(date.getHours())}:${getTwoDigitString(date.getMinutes())}:${getTwoDigitString(
    date.getSeconds()
  )}`
}

export default function NotificationCard({ notification, className = '', onClose }: NotificationCardProps) {
  const variantClass =
    notification.type === 'info' ? 'alert-info' : notification.type === 'success' ? 'alert-success' : 'alert-error'

  const autoCloseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    resetAutoCloseTimeout()

    return () => {
      cancelAutoCloseTimeout()
    }
  }, [])

  return (
    <div className={`alert ${variantClass} flex-row ${className}`}>
      <div className="block">
        <time className="text-xs">{getTimeString(notification.createdAt)}</time>
        <div dangerouslySetInnerHTML={{ __html: notification.content }} />
      </div>
      <div className="flex-none">
        <button
          onClick={() => {
            if (onClose) {
              onClose(notification)
            }
            cancelAutoCloseTimeout()
          }}
          className="btn btn-sm"
        >
          ✕
        </button>
      </div>
    </div>
  )

  function resetAutoCloseTimeout() {
    if (autoCloseTimeout.current) {
      clearTimeout(autoCloseTimeout.current)
    }
    autoCloseTimeout.current = setTimeout(() => {
      if (onClose) onClose(notification)
    }, 10000)
  }

  function cancelAutoCloseTimeout() {
    if (autoCloseTimeout.current) {
      clearTimeout(autoCloseTimeout.current)
    }
  }
}
