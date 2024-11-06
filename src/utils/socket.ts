import { io } from "socket.io-client";


const SOCKET_URL = "http://localhost:3004"; 

const socket = io(SOCKET_URL, {
  transports: ["websocket"], 
  reconnectionAttempts: 5,  
  timeout: 10000,        
  autoConnect: true,        
});

export default socket;
