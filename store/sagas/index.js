import { all } from 'redux-saga/effects';

import createChatsSagas from './chats';
import createGameSagas from './game';
import createNotifsSagas from './notifs';
import createPlayerSagas from './player';
import createRoundSagas from './round';
import createRoomsSagas from './rooms';
import createSystemSagas from './system';


let chats;
let game;
let notifs;
let player;
let rooms;
let round;
let system;

function* rootSaga() {
  yield all([
    chats(),
    game(),
    notifs(),
    player(),
    rooms(),
    round(),
    system(),
  ]);
}

export default function createRootSagas(_socket, _events, _chatEvents) {
  chats = createChatsSagas(_socket, _events, _chatEvents);
  game = createGameSagas(_socket, _events);
  notifs = createNotifsSagas(_socket, _events);
  player = createPlayerSagas(_socket, _events);
  rooms = createRoomsSagas(_socket, _events);
  round = createRoundSagas(_socket, _events);
  system = createSystemSagas(_socket, _events);
  return rootSaga;
};
