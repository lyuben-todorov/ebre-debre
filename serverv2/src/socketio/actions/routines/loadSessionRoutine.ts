import _ from 'lodash';
import { EventContext } from "../../EventContext";
import { ActionTypes, AuthRegisterOnSocket } from "../../models/actions/Action";
import { AUTH_REGISTER_ON_SOCKET, SESSION_UNKNOWN, RESPOND_SESSION, AUTH_REQUEST_SESSION } from "../../models/actions/ActionTypes";
import ActionBuilder from "../../models/actions/ActionBuilder";
import createLogger from "../../../createLogger";
import redisClient from "../../../redis/redisClient";
import { UserSession } from "../../../socketio/models/sessions/UserSession";
import PersonalMatchSession from '../../../socketio/models/sessions/PersonalMatchSession';
import mainRoutine from './mainRoutine';
export default function actionCallback(this: EventContext, action: ActionTypes) {
    console.log("loadSession");
    var { type } = action;

    switch (type) {

        case AUTH_REGISTER_ON_SOCKET:

            //no need for block scope as there is only one action.
            const { payload } = action as AuthRegisterOnSocket
            //set session here
            this.socketLogger = createLogger(payload.sessionId.slice(-5));

            this.socketLogger.info("Session registered:" + payload.sessionId.slice(-5));



            redisClient.get(payload.sessionId, (err, res) => {
                if (!err && _.isEmpty(res)) {
                    this.socketLogger.info("No session to restore found");

                } else {
                    var parsedUserSessionObject: UserSession = JSON.parse(res);

                    this.socketLogger = createLogger(parsedUserSessionObject.sessionId);

                    this.socketLogger.info("Socket session retrieved successfully");

                    this.userSession = parsedUserSessionObject;

                    if (parsedUserSessionObject.inMatch) {
                        parsedUserSessionObject.matchIds.forEach(matchId => {
                            console.log(matchId)
                            redisClient.get(matchId + "object", (err, reply) => {
                                var parsedMatchSessionObject: PersonalMatchSession = JSON.parse(reply);
                                this.sessionList[parsedMatchSessionObject.matchId] = parsedMatchSessionObject;
                            })
                        });
                    }


                    this.socket.removeListener('action', actionCallback)

                    mainRoutine.call(this);
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