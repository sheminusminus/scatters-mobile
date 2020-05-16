import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { requestRoom, emitName, requestListRooms } from '../../actions';

import {
  getAllRoomNames,
  getJoinedRoomNames,
  getUsername,
  getRecordingPermission,
} from '../../selectors';

import screen from './Rooms';


const mapState = createStructuredSelector({
  allRooms: getAllRoomNames,
  joinedRooms: getJoinedRoomNames,
  username: getUsername,
  permission: getRecordingPermission,
});

const mapDispatch = {
  onRequestRoom: requestRoom.trigger,
  onRequestListRooms: requestListRooms.trigger,
  onEmitName: emitName.trigger,
};


export default connect(mapState, mapDispatch)(screen);
