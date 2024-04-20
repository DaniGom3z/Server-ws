import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { Socket } from "socket.io";

config();

export const JWTMiddlware = (socket: Socket, token: string, next: Function) => {
  if (!token) {
    return next(new Error("Falta token de autenticación"));
  }
  try {
    const decoded: any = jwt.verify(
      token,
      process.env.SECRET_KEY_JWT || "clavecita"
    );
    const userId = decoded.userId;
    socket.data.userId = userId;
    next();
  } catch (error: any) {
    return next(new Error(error.message));
  }
};
