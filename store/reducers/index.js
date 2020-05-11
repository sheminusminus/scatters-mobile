import { combineReducers } from 'redux';

import game from './game';
import player from './player';
import round from './round';


export default () => combineReducers({
  game,
  player,
  round,
});

