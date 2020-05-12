import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { requestRoom } from '../../actions';

import {
  getRoomsAllRoomsNames,
  getRoomsJoinedRoomsNames,
} from '../../selectors';

import screen from './Rooms';


const mapState = createStructuredSelector({
  allRooms: getRoomsAllRoomsNames,
  joinedRooms: getRoomsJoinedRoomsNames,
});

const mapDispatch = {
  onRequestRoom: requestRoom.trigger,
};


export default connect(mapState, mapDispatch)(screen);
