export type SocketLogs = {
  robot_id: string
  type: 'info' | 'error' | 'warning'
  message: string
  attachment?: unknown
  algorithm?: {
    name: string
    run_id?: number
    inputs?: unknown
    state?: unknown
  }
  timestamp: string
}
