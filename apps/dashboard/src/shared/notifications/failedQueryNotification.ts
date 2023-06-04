import { NotificationToPush } from '../model/NotificationToPush'

export function failedQueryNotification(path: string): NotificationToPush {
  return {
    content: `Failed to query data 😔: <code class="kbd">${path}</code>`,
    type: 'error'
  }
}
