import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  getGameActivePlayer,
  getGameCurrentList,
  getGamePlayersNotWaiting,
  getGameRoundsScored,
  getModalIsOpen,
  getModalResponses,
  getPlayerId,
} from '../../selectors';

import { sendTallies, nextRound } from '../../actions';

import screen from './Responses';


const mapState = createStructuredSelector({
  activePlayer: getGameActivePlayer,
  currentList: getGameCurrentList,
  isOpen: getModalIsOpen,
  playerId: getPlayerId,
  players: getGamePlayersNotWaiting,
  responses: getModalResponses,
  roundsScored: getGameRoundsScored,
});

const mapDispatch = {
  onSendTallies: sendTallies.trigger,
  onNextRound: nextRound.trigger,
};


export default connect(mapState, mapDispatch)(screen);
