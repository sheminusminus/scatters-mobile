import { combineReducers } from 'redux';

import game from './game';
import player from './player';
import rooms from './rooms';
import round from './round';


export default () => combineReducers({
  game,
  player,
  rooms,
  round,
});

