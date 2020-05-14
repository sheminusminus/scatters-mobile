import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  getPlayersNotWaiting,
  getRoundsScored,
  getPlayerIsActive,
} from '../../selectors';

import { nextRound } from '../../actions';

import screen from './Scores';


const mapState = createStructuredSelector({
  playerIsActive: getPlayerIsActive,
  players: getPlayersNotWaiting,
  roundsScored: getRoundsScored,
});

const mapDispatch = {
  onNextRound: nextRound.trigger,
};


export default connect(mapState, mapDispatch)(screen);
