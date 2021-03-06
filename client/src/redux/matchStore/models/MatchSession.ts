import { GameTypes } from "../../GameTypes";
import ChessParticipant from "./ChessParticipant";
import { Move } from "chess.js";

export interface MatchSession {
    matchId: string

    position: string // fen string

    proponent: ChessParticipant
    opponent: ChessParticipant

    onMove: "white" | "black";
    issueTime: number // unix time of issue by matchmaker
    gameType: GameTypes // CHESS, CHESS_360?, FISCHER_CHESS?
    gameTime: number //  game time by spec  in seconds 

    finished: boolean
    winner: string
    chatHistory: string[]  // 
    moveCount: number;
    moveHistory: Move[]  //not verbose

    lastPlayerMoveTime: number;

}