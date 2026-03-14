
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {
  
  console.log('Client connected');
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('Desde el cliente:', data);
    // Todo: enviar la data al cliente de regreso

    const payload = {
      type: 'custom-message',
      payload: data.toString(),
    }

    ws.send(JSON.stringify(payload));

  });

  // ws.send('Hola desde el servidor');

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('http://localhost:3000');