import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  clearRoom,
  getStatus,
  setRound,
  startGame,
} from '../../actions';

import {
  getCurrentList,
  getPlayers,
  getActiveRoom,
  getAllState,
} from '../../selectors';

import screen from './Start';


const mapState = createStructuredSelector({
  currentList: getCurrentList,
  players: getPlayers,
  room: getActiveRoom,
  allState: getAllState,
});

const mapDispatch = {
  onClearRoom: clearRoom.trigger,
  onGetStatus: getStatus.trigger,
  onSetRound: setRound.trigger,
  onStartGame: startGame.trigger,
};


export default connect(mapState, mapDispatch)(screen);
