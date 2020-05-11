import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  getGamePlayersNotWaiting,
  getGameRoundsScored,
  getPlayerIsActive,
} from '../../selectors';

import { nextRound } from '../../actions';

import screen from './Scores';


const mapState = createStructuredSelector({
  playerIsActive: getPlayerIsActive,
  players: getGamePlayersNotWaiting,
  roundsScored: getGameRoundsScored,
});

const mapDispatch = {
  onNextRound: nextRound.trigger,
};


export default connect(mapState, mapDispatch)(screen);
