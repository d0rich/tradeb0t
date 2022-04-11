# Quick Start

Install dependencies: 

```sh
npm install
```

Create `.env` file with next variables:

```env
TINKOFF_SANDBOX_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Initialize local SQLite database:

```sh
npm run db-update
```

Run robot in _development_ mode:

```sh
npm run dev
```

or

run in _production_ mode:

```sh
npm run start
```