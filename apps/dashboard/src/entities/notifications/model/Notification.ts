export interface Notification {
  type: 'error' | 'success' | 'info'
  content: string
  /**
   * Should be created with `new Date().getTime()`
   */
  createdAt: number
}
