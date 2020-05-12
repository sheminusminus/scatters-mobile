import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { requestRoom, emitName } from '../../actions';

import {
  getRoomsAllRoomsNames,
  getRoomsJoinedRoomsNames,
  getPlayerName,
} from '../../selectors';

import screen from './Rooms';


const mapState = createStructuredSelector({
  allRooms: getRoomsAllRoomsNames,
  joinedRooms: getRoomsJoinedRoomsNames,
  username: getPlayerName,
});

const mapDispatch = {
  onRequestRoom: requestRoom.trigger,
  onEmitName: emitName.trigger,
};


export default connect(mapState, mapDispatch)(screen);
