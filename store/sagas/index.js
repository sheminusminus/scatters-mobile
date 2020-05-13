import { all } from 'redux-saga/effects';

import createGameSagas from './game';
import createPlayerSagas from './player';
import createRoundSagas from './round';
import createRoomsSagas from './rooms';
import createSystemSagas from './system';


let game;
let player;
let rooms;
let round;
let system;

function* rootSaga(_socket, _events) {
  yield all([
    game(_socket, _events),
    player(_socket, _events),
    rooms(_socket, _events),
    round(_socket, _events),
    system(_socket, _events),
  ]);
}

export default function createRootSagas(_socket, _events) {
  game = createGameSagas(_socket, _events);
  player = createPlayerSagas(_socket, _events);
  rooms = createRoomsSagas(_socket, _events);
  round = createRoundSagas(_socket, _events);
  system = createSystemSagas(_socket, _events);
  return rootSaga;
};
