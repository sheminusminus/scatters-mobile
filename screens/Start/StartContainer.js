import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  getStatus,
  startGame,
  setRound,
} from '../../actions';

import {
  getGameActivePlayerName,
  getGameCurrentList,
  getGamePlayers,
  getPlayerIsActive,
  getPlayerName,
} from '../../selectors';

import screen from './Start';


const mapState = createStructuredSelector({
  activePlayerName: getGameActivePlayerName,
  currentList: getGameCurrentList,
  name: getPlayerName,
  playerIsActive: getPlayerIsActive,
  players: getGamePlayers,
});

const mapDispatch = {
  onGetStatus: getStatus.trigger,
  onSetRound: setRound.trigger,
  onStartGame: startGame.trigger,
};


export default connect(mapState, mapDispatch)(screen);
