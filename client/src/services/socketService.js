import { io } from "socket.io-client";
import { get } from "svelte/store";
import { account } from "../stores/auth.js";

const socket = io("http://localhost:8080", {
  autoConnect: false,
});

export function connectSocket() {
  const user = get(account);

  socket.auth = {
    username: user?.username,
  };

  socket.connect();
  console.log("Socket connecting as:", user?.username);
}

export function disconnectSocket() {
  socket.disconnect();
}

export default socket;