import { WebSocketServer } from "ws";

const PORT = 3000;
const server = new WebSocketServer({ port: PORT });

console.log(`WebSocket server started on ws://localhost:${PORT}`);

server.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("message", (snakeData) => {
    const snakeDataObject = snakeData.toString();

    server.clients.forEach((client) => {
      if (client !== socket && client.readyState === 1) {
        client.send(snakeDataObject);
      }
    });
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
});
