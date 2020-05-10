import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  rollDice,
  resetDiceRoll,
} from '../../actions';

import {
  getGameActivePlayer,
  getGameActivePlayerName,
  getGameRoll,
  getGameTimeLeft,
  getPlayerId,
  getPlayerIsActive,
} from '../../selectors';

import screen from './Game';


const mapState = createStructuredSelector({
  activePlayer: getGameActivePlayer,
  activePlayerName: getGameActivePlayerName,
  id: getPlayerId,
  playerIsActive: getPlayerIsActive,
  roll: getGameRoll,
  timeLeft: getGameTimeLeft,
});

const mapDispatch = {
  onRollDice: rollDice.trigger,
  onResetDice: resetDiceRoll.trigger,
};


export default connect(mapState, mapDispatch)(screen);
