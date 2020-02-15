import http from 'http'
import socketio from 'socket.io'

import env from "./env";
import app from "./app";
import createLogger from './createLogger';
import attachEvents from './socketio/attachEvents';


const PORT = env.PORT || 5000;
export const serverLogger = createLogger("Server");
const server = http.createServer(app);

const io = socketio(server)
// set socket callbacks;
attachEvents(io);

server.on("close", () => {
    serverLogger.warn(`Server Closed`)
})
server.listen(PORT, () => { serverLogger.info(`Listening on ${PORT}`) })
