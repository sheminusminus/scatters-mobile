import { combineReducers } from 'redux';

import chats from './chats';
import game from './game';
import player from './player';
import rooms from './rooms';
import round from './round';
import system from './system';


export default () => combineReducers({
  chats,
  game,
  player,
  rooms,
  round,
  system,
});

