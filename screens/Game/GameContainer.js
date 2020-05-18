import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  rollDice,
  resetDiceRoll,
} from '../../actions';

import {
  getActivePlayerUsername,
  getPlayerIsActive,
  getRoll,
  getTimeLeft,
} from '../../selectors';

import screen from './Game';


const mapState = createStructuredSelector({
  activePlayerName: getActivePlayerUsername,
  playerIsActive: getPlayerIsActive,
  roll: getRoll,
  timeLeft: getTimeLeft,
});

const mapDispatch = {
  onRollDice: rollDice.trigger,
  onResetDice: resetDiceRoll.trigger,
};


export default connect(mapState, mapDispatch)(screen);
