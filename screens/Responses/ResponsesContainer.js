import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  getGameCurrentList,
  getGamePlayersNotWaiting,
  getGameRoundsScored,
  getGameResponses,
} from '../../selectors';

import { sendTallies } from '../../actions';

import screen from './Responses';


const mapState = createStructuredSelector({
  currentList: getGameCurrentList,
  players: getGamePlayersNotWaiting,
  responses: getGameResponses,
  roundsScored: getGameRoundsScored,
});

const mapDispatch = {
  onSendTallies: sendTallies.trigger,
};


export default connect(mapState, mapDispatch)(screen);