export enum EAlgorithmRunStatus {
  RUNNING = 'running',
  STOPPED = 'stopped',
  RESUMED = 'resumed',
  FINISHED = 'finished',
  ERROR = 'error'
}

export type AlgorithmRunStatus = EAlgorithmRunStatus | `${EAlgorithmRunStatus}`
