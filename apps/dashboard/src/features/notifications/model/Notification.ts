export interface Notification {
  type: 'error' | 'success' | 'info'
  content: JSX.Element
  createdAt: Date
}
