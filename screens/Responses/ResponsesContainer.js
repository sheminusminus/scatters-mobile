import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  getGameActivePlayer,
  getGameCurrentList,
  getGamePlayersNotWaiting,
  getGameRoundsScored,
  getGameResponses,
  getPlayerId,
} from '../../selectors';

import { sendTallies, nextRound } from '../../actions';

import screen from './Responses';


const mapState = createStructuredSelector({
  activePlayer: getGameActivePlayer,
  currentList: getGameCurrentList,
  playerId: getPlayerId,
  players: getGamePlayersNotWaiting,
  responses: getGameResponses,
  roundsScored: getGameRoundsScored,
});

const mapDispatch = {
  onSendTallies: sendTallies.trigger,
  onNextRound: nextRound.trigger,
};


export default connect(mapState, mapDispatch)(screen);
