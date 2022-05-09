# Quick Start

## Preparation

Install dependencies: 

```sh
npm install
```

Create `.env` file with next variables:

```env
TINKOFF_SANDBOX_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
BOT_TOKEN=qwerty123
```

Initialize local SQLite database:

```sh
npm run db-update
```

## Run

Run robot in _development_ mode:

```sh
npm run dev
```

or

run in _production_ mode:

```sh
npm run start
```

# Try it out

## Check database

You can check robot local database by running

```sh
npm run db-browse
```

## Check requests

We have [Postman workspace](https://www.postman.com/bad-labs/workspace/tradebots/overview) for testing robots.