import express from 'express';
import cors from 'cors';
import { createServer } from "node:http";
import { Server, Socket } from "socket.io";
import { JWTMiddlware } from "./src/middleware/jwt_middleware";
import { dataHandler } from "./src/handlers/data_handler";
import { db } from "./src/config/database_config";

const app = express();
const httpServer = createServer(app);

app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}));

app.use(express.json());

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  },
  pingInterval: 1000,
  pingTimeout: 2000,
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  JWTMiddlware(socket, token, next);
});

const onConnection = (socket: Socket) => {
  console.log("Cliente conectado");

  socket.join(socket.data.userId);

  dataHandler(io, socket);
};

io.on("connection", onConnection);

httpServer.listen(4200, () => {
  console.log("Servidor corriendo en el puerto 4200");
});

db.connect()
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.log(err);
  });
