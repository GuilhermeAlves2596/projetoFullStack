// import { WebSocketServer } from "ws";

// const server = new WebSocketServer({ port: 3000 });
// let conns = [];

// server.on('connection', (socket) => {
//     console.log(`Nova conexão... ${conns.length}`);
//     conns.push(socket);

//     socket.on('close', () => {
//         console.log(`Fechando conexão... ${conns.indexOf(socket)}`);
//         conns = conns.filter((s) => s === socket);
//     });

//     socket.on('message', (msg) => {
//         console.log(`${conns.indexOf(socket)}: ${msg}`);
//         // Aqui você pode adicionar lógica para lidar com mensagens específicas, se necessário.
//     });
// });

// // Função para enviar notificação a todos os clientes, exceto o remetente
// const sendNotificationToAllExceptSender = (senderSocket, message) => {
//     conns.forEach((conn) => {
//         if (conn !== senderSocket && conn.readyState === WebSocket.OPEN) {
//             conn.send(message);
//         }
//     });
// };

// // Exemplo de evento para notificar todos os clientes sobre a adição de uma carta
// const notifyCardAdded = (senderSocket, cardInfo) => {
//     const message = `Nova carta adicionada: ${cardInfo}`;
//     sendNotificationToAllExceptSender(senderSocket, message);
// };
