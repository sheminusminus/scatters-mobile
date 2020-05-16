import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { emitName, retrieveName, permsCheckRecording } from '../../actions';

import { getUsername, getLookedForName, getJoinedRoomNames } from '../../selectors';

import screen from './Entry';


const mapState = createStructuredSelector({
  username: getUsername,
  lookedForName: getLookedForName,
  rooms: getJoinedRoomNames,
});

const mapDispatch = {
  onEmitName: emitName.trigger,
  onRetrieveName: retrieveName.trigger,
  onCheckRecordingPerms: permsCheckRecording.trigger,
};


export default connect(mapState, mapDispatch)(screen);
