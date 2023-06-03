import { useEffect, useRef } from 'react'
import type { Notification } from '../model/Notification'
import CountdownProgressBar from '@/src/shared/ui/CountdownProgressBar'
import { getTimeString } from '@/src/shared/utils/date'

export interface NotificationCardProps {
  notification: Notification
  className?: string
  onClose?: (notification: Notification) => void
}

export default function NotificationCard({ notification, className = '', onClose }: NotificationCardProps) {
  const variantClass =
    notification.type === 'info' ? 'alert-info' : notification.type === 'success' ? 'alert-success' : 'alert-error'

  const autoCloseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const timeBeforeClose = 10_000

  useEffect(() => {
    resetAutoCloseTimeout()

    return () => {
      cancelAutoCloseTimeout()
    }
  }, [])

  return (
    <div className={`alert ${variantClass} flex-row ${className}`}>
      <div className="block">
        <time className="text-xs">{getTimeString(new Date(notification.createdAt))}</time>
        <div dangerouslySetInnerHTML={{ __html: notification.content }} />
        <CountdownProgressBar className="mt-2" duration={timeBeforeClose} />
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
    }, timeBeforeClose)
  }

  function cancelAutoCloseTimeout() {
    if (autoCloseTimeout.current) {
      clearTimeout(autoCloseTimeout.current)
    }
  }
}
