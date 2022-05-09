import { WebSocketServer, WebSocket } from 'ws';
import { TradeBot } from '../../../TradeBot';

export function configureWebSocketServer(wss: WebSocketServer, tradeBot: TradeBot){
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
}