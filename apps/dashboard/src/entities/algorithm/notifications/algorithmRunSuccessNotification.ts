import type { NotificationToPush } from '@/src/entities/notifications/model/NotificationToPush'
import type { Algorithm, AlgorithmRun } from '@tradeb0t/core'

export function algorithmRunSuccessNotification(algorithm: Algorithm, algorithmRun: AlgorithmRun): NotificationToPush {
  return {
    content: `Algorithm <code class="kbd kbd-sm text-white">${algorithm.name}</code> is running successfully with id: <code class="kbd kbd-sm text-white">${algorithmRun.id}</code>!`,
    type: 'success'
  }
}
