import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  requestAllUsers,
  requestOnlineUsers,
  sendPushNotif,
} from '../../actions';

import {
  getAllPlayers,
  getOnlinePlayers,
} from '../../selectors';

import screen from './Presence';


const mapState = createStructuredSelector({
  allPlayers: getAllPlayers,
  onlinePlayers: getOnlinePlayers,
})

const mapDispatch = {
  onGetAllPlayers: requestAllUsers.trigger,
  onGetOnlinePlayers: requestOnlineUsers.trigger,
  onSendPushNotif: sendPushNotif.trigger,
};


export default connect(mapState, mapDispatch)(screen);
