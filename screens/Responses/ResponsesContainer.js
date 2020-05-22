import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  getActiveRoom,
  getCurrentList,
  getPlayersNotWaiting,
  getRoundsScored,
  getResponses,
  getCanRecord,
} from '../../selectors';

import { audioStartRecording, sendTallies, permsRequestRecording, clearChat } from '../../actions';

import screen from './Responses';


const mapState = createStructuredSelector({
  canRecord: getCanRecord,
  currentList: getCurrentList,
  players: getPlayersNotWaiting,
  responses: getResponses,
  roundsScored: getRoundsScored,
});

const mapDispatch = {
  onRequestRecording: permsRequestRecording.trigger,
  onSendTallies: sendTallies.trigger,
  onClearChat: clearChat.trigger,
  onRecord: audioStartRecording.trigger,
};


export default connect(mapState, mapDispatch)(screen);
