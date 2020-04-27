import * as React from 'react'
import Message from './Message';

// import { startMatchmaking, replyMatchmaking } from '../../../redux/actionCreators'
import { connect } from 'react-redux';
import { CLIENT_PROPOSE_MATCHUP, CLIENT_GAME_OVER, CLIENT_SEND_CHAT_MESSAGE } from '../../../../../redux/matchStore/matchTypes';
import { RootState } from '../../../../../redux/rootReducer';
import ChatMessage from '../../../../../redux/matchStore/models/ChatMessage';

interface Props {

        action: string;
        chatHistory: ChatMessage[];
        winner: string;
        username: string;
}
interface State {
        messages: ChatMessage[];
}
export type ChatMessageTypes = "gameOver" | "initiateGame" | "resumeGame" | "chat" | "ping";
export type ChatMessageChannels = "currentMatch" | "private" | "global";

class MessageBox extends React.Component<Props, State> {
        constructor(props: Props) {
                super(props);
                this.state = {
                        messages: [],
                }
                this.addMessage = this.addMessage.bind(this);
        }

        componentDidMount() {
                var mount: ChatMessage = {
                        channel: "currentMatch",
                        message: "hi",
                        sender: "game",
                        type: "ping"
                }
                this.addMessage(mount);
        }
        addMessage(message: ChatMessage) {


                this.setState(state => {
                        const messages = [...state.messages, message]
                        return { messages }
                })
        }

        componentDidUpdate(prevProps: Props) {
                if (this.props.action !== prevProps.action || this.props.chatHistory !== prevProps.chatHistory) {
                        switch (this.props.action) {
                                case "initiateGame" || "resumeGame":
                                        //this.addMessage(CLIENT_START_GAME)
                                        break;
                                case "gameOver":

                                        if (this.props.winner === "draw") {
                                                var message: ChatMessage = {
                                                        channel: "currentMatch",
                                                        message: "Draw",
                                                        sender: "server",
                                                        type: "gameOver"
                                                }
                                                this.addMessage(message)

                                        } else {
                                                var message: ChatMessage = {
                                                        channel: "currentMatch",
                                                        message: "Win",
                                                        sender: "server",
                                                        type: "gameOver"
                                                }
                                                this.addMessage(message);
                                        }

                                case "receive_chat_message":
                                        var message = this.props.chatHistory.slice(-1)[0]

                                        this.addMessage(message);
                                default:
                                        break;
                        }

                }
        }


        render() {
                return (
                        <div className="ChatHistory">
                                {this.state.messages.map((message: ChatMessage, index: number) => (
                                        <Message message={message} ></Message>
                                ))}

                        </div>

                )
        }
}

const mapStateToProps = (state: RootState) => {
        return {
                action: state.clientState.gameState,
                chatHistory: state.match.chatHistory,
                winner: "winner chicken dinner",
                username: state.session.username,
        }
}

const mapDispatchToProps = {}

export default connect(
        mapStateToProps,
        mapDispatchToProps
)(MessageBox)
