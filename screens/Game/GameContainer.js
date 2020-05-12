import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  rollDice,
  resetDiceRoll,
} from '../../actions';

import {
  getGameActivePlayerName,
  getGameRoll,
  getGameTimeLeft,
  getPlayerIsActive,
} from '../../selectors';

import screen from './Game';


const mapState = createStructuredSelector({
  activePlayerName: getGameActivePlayerName,
  playerIsActive: getPlayerIsActive,
  roll: getGameRoll,
  timeLeft: getGameTimeLeft,
});

const mapDispatch = {
  onRollDice: rollDice.trigger,
  onResetDice: resetDiceRoll.trigger,
};


export default connect(mapState, mapDispatch)(screen);
