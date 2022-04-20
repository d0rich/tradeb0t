import { WebSocketServer, WebSocket } from 'ws';
import { tradeBot } from '../..';


const wss = new WebSocketServer({ 
  // @ts-ignore
  port: isNaN(+process.env.WS_PORT)  ? 4269 : +process.env.WS_PORT,  
  host: process.env.HOST || 'localhost'
});

wss.on('connection', (ws, req) => {
  if (!tradeBot.auth.authByRequest(req)) ws.close()
  
  ws.send('Hello from tradebot...\r\n'+tradeBot.logger.getLastLogs())
});

wss.on('log', (message) => {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
})

export const wsApi = wss