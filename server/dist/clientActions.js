"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MATCHMAKER_ADD_TO_QUEUE = exports.CLIENT_RESUME_SESSION = exports.CLIENT_RESUME_GAME = exports.CLIENT_ALREADY_IN_QUEUE = exports.CLIENT_START_GAME = exports.CLIENT_PROPOSE_MATCHUP = exports.CLIENT_SEND_CHAT_MESSAGE = exports.CLIENT_REPLY_DRAW = exports.CLIENT_OFFER_DRAW = exports.CLIENT_UPDATE_GAME = exports.CLIENT_GAME_OVER = exports.GAME_CONCEDE = exports.GAME_REPLY_DRAW = exports.GAME_OFFER_DRAW = exports.GAME_PLAYER_MOVE = exports.GAME_PLAYER_READY = exports.SERVER_SEND_CHAT_MESSAGE = exports.SERVER_REGISTER_USER = exports.SERVER_REPLY_MATCHUP = exports.SERVER_START_MATCHMAKING = void 0;
var SERVER_START_MATCHMAKING = "server/START_MATCHMAKING";
exports.SERVER_START_MATCHMAKING = SERVER_START_MATCHMAKING;
var SERVER_REPLY_MATCHUP = "server/REPLY_MATCHUP";
exports.SERVER_REPLY_MATCHUP = SERVER_REPLY_MATCHUP;
var SERVER_REGISTER_USER = "server/REGISTER_USER";
exports.SERVER_REGISTER_USER = SERVER_REGISTER_USER;
var SERVER_SEND_CHAT_MESSAGE = "server/SEND_CHAT_MESSAGE";
exports.SERVER_SEND_CHAT_MESSAGE = SERVER_SEND_CHAT_MESSAGE;
var GAME_PLAYER_READY = "game/PLAYER_READY";
exports.GAME_PLAYER_READY = GAME_PLAYER_READY;
var GAME_PLAYER_MOVE = "game/PLAYER_MOVE";
exports.GAME_PLAYER_MOVE = GAME_PLAYER_MOVE;
var GAME_OFFER_DRAW = "game/OFFER_DRAW";
exports.GAME_OFFER_DRAW = GAME_OFFER_DRAW;
var GAME_REPLY_DRAW = "game/REPLY_DRAW";
exports.GAME_REPLY_DRAW = GAME_REPLY_DRAW;
var GAME_CONCEDE = "game/CONCEDE";
exports.GAME_CONCEDE = GAME_CONCEDE;
var CLIENT_GAME_OVER = "client/GAME_OVER";
exports.CLIENT_GAME_OVER = CLIENT_GAME_OVER;
var CLIENT_UPDATE_GAME = "client/UPDATE_GAME";
exports.CLIENT_UPDATE_GAME = CLIENT_UPDATE_GAME;
var CLIENT_OFFER_DRAW = "client/OFFER_DRAW";
exports.CLIENT_OFFER_DRAW = CLIENT_OFFER_DRAW;
var CLIENT_REPLY_DRAW = "client/REPLY_DRAW";
exports.CLIENT_REPLY_DRAW = CLIENT_REPLY_DRAW;
var CLIENT_SEND_CHAT_MESSAGE = "client/SEND_CHAT_MESSAGE";
exports.CLIENT_SEND_CHAT_MESSAGE = CLIENT_SEND_CHAT_MESSAGE;
var CLIENT_PROPOSE_MATCHUP = "client/PROPOSE_MATCHUP";
exports.CLIENT_PROPOSE_MATCHUP = CLIENT_PROPOSE_MATCHUP;
var CLIENT_START_GAME = "client/START_GAME";
exports.CLIENT_START_GAME = CLIENT_START_GAME;
var CLIENT_ALREADY_IN_QUEUE = "client/ALREADY_IN_QUEUE";
exports.CLIENT_ALREADY_IN_QUEUE = CLIENT_ALREADY_IN_QUEUE;
var CLIENT_RESUME_GAME = "client/RESUME_GAME";
exports.CLIENT_RESUME_GAME = CLIENT_RESUME_GAME;
var CLIENT_RESUME_SESSION = "client/RESUME_SESSION";
exports.CLIENT_RESUME_SESSION = CLIENT_RESUME_SESSION;
var MATCHMAKER_ADD_TO_QUEUE = "matchmaker/ADD_TO_QUEUE";
exports.MATCHMAKER_ADD_TO_QUEUE = MATCHMAKER_ADD_TO_QUEUE;