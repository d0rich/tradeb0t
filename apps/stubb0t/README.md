# tradeb0t stubb0t

Stub implementation of tradeb0t project.

## Demo

Stubb0t is deployed on render and available for usage: https://stubb0t.onrender.com/

It have no web interface, but you can use with TRPC client. For this purpose TRPC playground is available: https://stubb0t.onrender.com/trpc-playground. @tradeb0t/core provides it from the box in development mode. 

Try this query to get list of currencies in portfolio:

```ts
await trpc.currencies.listBalances.query()
export {}
```