# @tradeb0t/core

## 0.4.0

### Minor Changes

- 49f9935: Use superjson transformer. Specify TRPC HTTP client for server.

### Patch Changes

- 49f9935: [Fix] rewrite orders selector

## 0.3.6

### Patch Changes

- 43513a3: TRPC methods for securities and currencies in portfolio

## 0.3.5

### Patch Changes

- f3a4671: Fix error handling in algorithms

## 0.3.4

### Patch Changes

- 4dfd2c4: Add pagination for algorithm runs on API level

## 0.3.3

### Patch Changes

- 47ba5c7: Add peerDependencies for ws: utf-8-validate, bufferutil
- 47ba5c7: OperationType now is created with enum, not just union type
- 47ba5c7: Wrap repositories into error handling proxy
- 47ba5c7: Update dependencies
- 47ba5c7: [Fix] handle `loadSecurityIfNotExist` in hook error
- 47ba5c7: Algorithm run status now includes enum instead of basic union type
- 47ba5c7: Store enums in separate files
- 47ba5c7: Define TRPC inputs as separate schemas
- 47ba5c7: Algorithm InputType now is enum instead of union type
- 47ba5c7: OrderStatus now created with enum, not just union type

## 0.3.2

### Patch Changes

- 773cf39: Fix publish script

## 0.3.1

### Patch Changes

- f413d2f: Update publish script

## 0.3.0

### Minor Changes

- d1c449c: Monorepo integration
