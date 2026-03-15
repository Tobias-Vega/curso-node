
const currentTicketLabel = document.querySelector('span');
const createTicketBtn = document.querySelector('button');

async function getLastTicket() {

  const response = await fetch('http://localhost:3000/api/ticket/last');

  const data = await response.json();

  return data;
}

async function renderTicketNumber() {
  const lastTicket = await getLastTicket();
  currentTicketLabel.innerText = lastTicket;
}

async function createTicket() {

  const newTicket = await fetch('http://localhost:3000/api/ticket', {
    method: 'POST',
  }).then(resp => resp.json());

  currentTicketLabel.innerText = newTicket.number;
  
}


createTicketBtn.addEventListener('click', createTicket)


renderTicketNumber();