import { StubExchangeState } from "./State";

export class StubExchangeApi {
  state = new StubExchangeState()
  isInitialized = false

  async initialize() {
    await this.state.initialize()
    this.isInitialized = true
  }
}
