// Referencias HTML

const lblPending = document.querySelector('#lbl-pending');

async function loadInitialCount() {
  const pending = await fetch('/api/ticket/pending').then((resp) =>
    resp.json(),
  );

  lblPending.innerHTML = pending.length || 0;
}

loadInitialCount();

function connectToWebSockets() {
  const socket = new WebSocket('ws://localhost:3000/ws');

  socket.onmessage = (event) => {
    console.log(event.data);
    const { type, payload } = JSON.parse(event.data);

    if (type !== 'on-ticket-count-changed');

    lblPending.innerHTML = payload;
  };

  socket.onclose = (event) => {
    console.log('Connection closed');
    setTimeout(() => {
      console.log('retrying to connect');
      connectToWebSockets();
    }, 1500);
  };

  socket.onopen = (event) => {
    console.log('Connected');
  };
}

connectToWebSockets();
