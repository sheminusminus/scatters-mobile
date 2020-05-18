import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  clearRoom,
  getStatus,
  setRound,
  startGame,
} from '../../actions';

import {
  getActiveRoom,
  getCurrentList,
  getGamePhase,
  getPlayers,
} from '../../selectors';

import screen from './Start';


const mapState = createStructuredSelector({
  currentList: getCurrentList,
  phase: getGamePhase,
  players: getPlayers,
  room: getActiveRoom,
});

const mapDispatch = {
  onClearRoom: clearRoom.trigger,
  onGetStatus: getStatus.trigger,
  onSetRound: setRound.trigger,
  onStartGame: startGame.trigger,
};


export default connect(mapState, mapDispatch)(screen);
