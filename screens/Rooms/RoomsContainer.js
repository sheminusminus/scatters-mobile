import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { requestRoom } from '../../actions';

import { getPlayerRooms, getPlayerDefaultRoomAvailable } from '../../selectors';

import screen from './Rooms';


const mapState = createStructuredSelector({
  defaultRoomAvailable: getPlayerDefaultRoomAvailable,
  rooms: getPlayerRooms,
});

const mapDispatch = {
  onRequestRoom: requestRoom.trigger,
};


export default connect(mapState, mapDispatch)(screen);
