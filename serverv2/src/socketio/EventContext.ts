import { Redis } from "ioredis";
import MatchSessionList from "./models/sessions/MatchSessionList";
import { UserSession } from "./models/sessions/UserSession";
import { Logger } from "winston";

export interface EventContext {
    (...args: any[]): void
    socket: SocketIO.Socket;
    socketLogger: Logger;
    userSession: UserSession;
    sessionList: MatchSessionList;
    personalChannel: Redis;

    emit :Function
    next: Function;
}