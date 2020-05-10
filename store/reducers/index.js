import { combineReducers } from 'redux';

import game from './game';
import modal from './modal';
import player from './player';
import round from './round';


export default () => combineReducers({
  game,
  modal,
  player,
  round,
});

