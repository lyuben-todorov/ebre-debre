import React, { Component } from 'react'
import { observer } from 'mobx-react'
import MessageWindow from './MessageWindow';
import MoveWindow from './MoveWindow';
import { Grid } from 'semantic-ui-react';
import { Provider } from 'react-redux';
import ChessGame from './Chess/ChessGame';
import '../_sass/Game.scss'

import { createStore, applyMiddleware } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import reducer from '../../redux/gameState'
import SessionStore from '../../Mobx/SessionStore';



@observer
class Game extends Component {

        constructor(props) {
                super(props)


                let socket = io(`http://localhost:3001?session=${this.props.sessionStore.sessionId}`);
                let socketMiddleware = createSocketIoMiddleware(socket, ["server/", "game/"]);
                let gameStore = applyMiddleware(socketMiddleware)(createStore)(reducer);
                this.state = { gameStore: gameStore };

        }
        render() {
                return (
                        <Provider store={this.state.gameStore}>
                                <Grid stackable divided="vertically">
                                        <Grid.Row columns={3}>
                                                <Grid.Column className="flexbox" width={4}>
                                                        <MessageWindow />
                                                </Grid.Column>
                                                <Grid.Column width={8}>
                                                        <ChessGame sessionStore={SessionStore} className="MainChessboard" />
                                                </Grid.Column>
                                                <Grid.Column className="flexbox" width={4}>
                                                        <MoveWindow />
                                                </Grid.Column>
                                        </Grid.Row>
                                </Grid>
                        </Provider>
                )
        }
}

export default Game;