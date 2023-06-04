import type { NotificationToPush } from '@/src/shared/model/NotificationToPush'
import type { Algorithm } from '@tradeb0t/core'

export function algorithmRunErrorNotification(algorithm: Algorithm): NotificationToPush {
  return {
    content: `Failed to run <code class="kbd kbd-sm text-white">${algorithm.name}</code> 😔.`,
    type: 'error'
  }
}
