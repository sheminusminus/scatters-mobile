import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  getStatus,
  startGame,
  setRound,
} from '../../actions';

import {
  getGameCurrentList,
  getGamePlayers,
  getRoomsRoom,
  getAllState,
} from '../../selectors';

import screen from './Start';


const mapState = createStructuredSelector({
  currentList: getGameCurrentList,
  players: getGamePlayers,
  room: getRoomsRoom,
  allState: getAllState,
});

const mapDispatch = {
  onGetStatus: getStatus.trigger,
  onSetRound: setRound.trigger,
  onStartGame: startGame.trigger,
};


export default connect(mapState, mapDispatch)(screen);
