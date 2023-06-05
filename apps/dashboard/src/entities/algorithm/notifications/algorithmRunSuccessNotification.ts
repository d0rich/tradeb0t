import type { NotificationToPush } from '@/src/shared/model/NotificationToPush'
import type { Algorithm, AlgorithmRun } from '@tradeb0t/core'

export function algorithmRunSuccessNotification(algorithm: Algorithm, algorithmRun: AlgorithmRun): NotificationToPush {
  return {
    content: `Algorithm <code class="kbd kbd-sm text-base-content">${algorithm.name}</code> is running successfully with id: <code class="kbd kbd-sm text-base-content">${algorithmRun.id}</code>!`,
    type: 'success'
  }
}
