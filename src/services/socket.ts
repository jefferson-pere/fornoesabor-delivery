import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_API_URL, {
  extraHeaders: {
    "x-api-key": import.meta.env.VITE_API_KEY,
  },
});
