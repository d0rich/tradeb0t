import { In, Not, Repository } from 'typeorm'
import { AlgorithmRun, AlgorithmRunStatus } from 'src/domain'

export class AlgorithmRunsRepository extends Repository<AlgorithmRun> {
  async runOne(algorithmName: string, inputs: unknown, state: unknown = inputs): Promise<AlgorithmRun> {
    return this.create({
      algorithmName,
      inputs,
      state,
      status: 'running'
    })
  }

  async saveProgress(id: number, state: unknown): Promise<AlgorithmRun> {
    if (!state) throw new Error('State is required')
    await this.update({ id }, { state })
    const updatedRun = await this.findOneBy({ id })
    if (!updatedRun) throw new Error(`AlgorithmRun wasn't updated successfully: ${{ id, state }}`)
    return updatedRun
  }

  async loadProgress(id: number): Promise<AlgorithmRun | null> {
    return this.findOneBy({ id })
  }

  async stopOne(id: number): Promise<AlgorithmRun> {
    await this.update({ id }, { status: 'stopped' })
    const stoppedRun = await this.findOneBy({ id })
    if (!stoppedRun) throw new Error(`AlgorithmRun wasn't stopped successfully: ${{ id }}`)
    return stoppedRun
  }

  async resumeOne(id: number): Promise<AlgorithmRun> {
    await this.update({ id }, { status: 'resumed' })
    const resumedRun = await this.findOneBy({ id })
    if (!resumedRun) throw new Error(`AlgorithmRun wasn't resumed successfully: ${{ id }}`)
    return resumedRun
  }

  async finishOne(id: number): Promise<AlgorithmRun> {
    await this.update({ id }, { status: 'finished' })
    const finishedRun = await this.findOneBy({ id })
    if (!finishedRun) throw new Error(`AlgorithmRun wasn't finished successfully: ${{ id }}`)
    return finishedRun
  }

  async storeError(id: number, error: Error): Promise<AlgorithmRun> {
    const run = await this.findOneBy({ id })
    const state = { stateBeforeError: run?.state, error: Object(error) }
    await this.update(
      { id },
      {
        status: 'error',
        state
      }
    )
    const runWithError = await this.findOneBy({ id })
    if (!runWithError) throw new Error(`Error in AlgorithmRun wasn't saved successfully: ${{ id }}`)
    return runWithError
  }

  async findManyByAlgorithm(algorithmName: string): Promise<AlgorithmRun[]> {
    return this.find({
      where: { algorithmName },
      order: { id: 'DESC' }
    })
  }

  async findAllUnfinished(): Promise<AlgorithmRun[]> {
    return this.find({
      where: {
        status: Not(In<AlgorithmRunStatus>(['finished', 'stopped', 'error']))
      }
    })
  }
}