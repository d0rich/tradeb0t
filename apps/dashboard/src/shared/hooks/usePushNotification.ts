import { useAppDispatch } from '@/src/shared/model/hooks'
import { pushNotification } from '@/src/shared/model/notificationsSlice'
import { NotificationToPush } from '../model/NotificationToPush'

export function usePushNotification() {
  const dispatch = useAppDispatch()
  return (notification: NotificationToPush) => {
    dispatch(pushNotification(notification))
  }
}
