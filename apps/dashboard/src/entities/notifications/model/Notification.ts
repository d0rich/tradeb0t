export interface Notification {
  type: 'error' | 'success' | 'info'
  content: string
  createdAt: Date
}
