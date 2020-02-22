import _ from 'lodash';
import redis from 'ioredis';

import { EventContext } from "../../EventContext";
import { ActionTypes, AuthRegisterOnSocket } from "../../models/actions/Action";
import { AUTH_REGISTER_ON_SOCKET, SESSION_UNKNOWN, RESPOND_SESSION, AUTH_REQUEST_SESSION, CLIENT_FOUND_GAME } from "../../models/actions/ActionTypes";
import ActionBuilder from "../../models/actions/ActionBuilder";
import createLogger from "../../../createLogger";
import redisClient from "../../../redis/redisClient";
import { UserSession } from "../../../socketio/models/sessions/UserSession";
import PersonalMatchSession from '../../../socketio/models/sessions/PersonalMatchSession';
import mainRoutine from './mainRoutine';
import mainSocketDisconnectCallback from './mainRoutine/mainSocketDisconnectCallback';
import mainSocketActionCallback from './mainRoutine/mainSocketActionCallback';
import mainRedisMessageCallback from './mainRoutine/mainRedisMessageCallback';
import { Server } from 'socket.io';
import ServerMatchSession from '../../../socketio/models/chess/ServerMatchSession';
import returnPersonalMatchSession from '../../../util/returnPersonalMatchSession';
export default function actionCallback(this: EventContext, action: ActionTypes) {
    var { type } = action;

    switch (type) {

        case AUTH_REGISTER_ON_SOCKET:

            //no need for block scope as there is only one action.
            const { payload } = action as AuthRegisterOnSocket
            //set session here
            this.socketLogger = createLogger(payload.sessionId.slice(-5));

            this.socketLogger.info("Session registered: " + payload.sessionId.slice(-5));



            redisClient.get(payload.sessionId, (err, res) => {
                if (!err && _.isEmpty(res)) {
                    this.socketLogger.info("No session to restore found");

                } else {
                    var parsedUserSessionObject: UserSession = JSON.parse(res);

                    this.socketLogger.info("Socket session retrieved successfully");

                    this.userSession = parsedUserSessionObject;

                    if (parsedUserSessionObject.inMatch) {
                        parsedUserSessionObject.matchIds.forEach(matchId => {
                            console.log("oooopa")
                            redisClient.get(matchId + "object", (err, reply) => {
                                var parsedMatchSessionObject: ServerMatchSession = JSON.parse(reply);
                                var personalizedSessionObject = returnPersonalMatchSession(parsedMatchSessionObject, payload.sessionId);

                                this.sessionList[personalizedSessionObject.matchId] = personalizedSessionObject;
                                this.socket.emit('action', 
                                    new ActionBuilder()
                                    .setType(CLIENT_FOUND_GAME)
                                    .setPayload({gameObject:personalizedSessionObject})
                                    );
                            })
                        });
                    }


                    this.socket.removeListener('action', actionCallback)


                    this.socket.on('disconnect', mainSocketDisconnectCallback.bind(this));
                    this.socket.on('action', mainSocketActionCallback.bind(this));

                    this.personalChannel = new redis();
                    this.personalChannel.subscribe(this.userSession.sessionId);
                
                    this.personalChannel.on('message', mainRedisMessageCallback.bind(this));
                    // mainRoutine.call(this);
                }
            })

            this.socket.emit('action',
                new ActionBuilder()
                    .setType(RESPOND_SESSION)
                    .setPayload({ status: "OK" })
                    .build())
            break;
        default:
            console.log(action)
            this.socket.emit('action',
                new ActionBuilder()
                    .setType(SESSION_UNKNOWN)
                    .setPayload({})
                    .build()
            )
    }
}