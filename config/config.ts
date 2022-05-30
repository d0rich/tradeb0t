try {
  require('dotenv').config()
}catch (e){}

export const config = {
  exchange: {
    exchangeToken: process.env.TINKOFF_SANDBOX_API_KEY || '',
  },
  auth: {
    token: process.env.BOT_TOKEN || '',
    required: false
  },
  api: {
    port: 4268,
    host: 'localhost'
  },
  logs: {
    directory: './logs'
  }
}