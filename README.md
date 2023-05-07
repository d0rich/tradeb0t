# tradeb0t 🤖

Tradebot is the library for creating trading bots for exchanges. 

Main features:
- **Standardized** - tradebot is based on common domain description for exchanges. It allows to create algorithms for different exchanges without changing them.
- **Scoped** - each tradebot instance is isolated from other instances. It allows to run multiple bots on the same machine.
- **Manageable** - tradebot have its own API based on [TRPC](https://trpc.io/). It allows to quickly create UI for managing bots.

This project is used to be my diploma project, and you can check its orginal repository [here](https://github.com/badlabs/tradebot-core). Now I'm trying to make it more useful for other people.

## Roadmap 🚗

- [ ]  Implement script for running several instances in multiple processes
- [ ]  Make `AbstractTradeAlgorithm` domain-agnostic
- [ ]  Create Binance implementation
- [ ]  Write [JSDoc](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)
