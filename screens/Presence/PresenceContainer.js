import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  requestAllUsers,
  requestOnlineUsers,
} from '../../actions';

import {
  getRoomsAllPlayers,
  getRoomsOnlinePlayers,
} from '../../selectors';

import screen from './Presence';


const mapState = createStructuredSelector({
  allPlayers: getRoomsAllPlayers,
  onlinePlayers: getRoomsOnlinePlayers,
})

const mapDispatch = {
  onGetAllPlayers: requestAllUsers.trigger,
  onGetOnlinePlayers: requestOnlineUsers.trigger,
};


export default connect(mapState, mapDispatch)(screen);
