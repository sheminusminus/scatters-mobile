import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { sendChatMessage } from '../../actions';
import { getActiveRoom, getMessagesForActiveChat, getActiveChat } from '../../selectors';

import Chat from './Chat';


const mapState = createStructuredSelector({
  messages: getMessagesForActiveChat,
  activeRoom: getActiveChat,
  room: getActiveRoom,
});

const mapDispatch = {
  // onGetMessages: getChatMessages.trigger,
  onSendMessage: sendChatMessage.trigger,
};


export default connect(mapState, mapDispatch)(Chat);
