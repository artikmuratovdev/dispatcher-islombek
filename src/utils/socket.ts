import { SERVER_URL } from "@/constants";
import { io } from "socket.io-client";

// export const socket = io(SERVER_URL);
export const socket = io();