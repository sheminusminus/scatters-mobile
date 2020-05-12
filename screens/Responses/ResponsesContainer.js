import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  getGameCurrentList,
  getGamePlayersNotWaiting,
  getGameRoundsScored,
  getGameResponses,
  getSystemCanRecord,
} from '../../selectors';

import { audioStartRecording, sendTallies, permsRequestRecording } from '../../actions';

import screen from './Responses';


const mapState = createStructuredSelector({
  canRecord: getSystemCanRecord,
  currentList: getGameCurrentList,
  players: getGamePlayersNotWaiting,
  responses: getGameResponses,
  roundsScored: getGameRoundsScored,
});

const mapDispatch = {
  onRequestRecording: permsRequestRecording.trigger,
  onSendTallies: sendTallies.trigger,
  onRecord: audioStartRecording.trigger,
};


export default connect(mapState, mapDispatch)(screen);
