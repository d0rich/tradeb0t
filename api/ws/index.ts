import { WebSocketServer, WebSocket } from 'ws';
import { tradeBot } from '../..';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
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