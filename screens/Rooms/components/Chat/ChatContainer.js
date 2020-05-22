import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { sendChatMessage } from '../../../../actions';
import { getMessagesForActiveChat, getChatMessages, getActiveChat } from '../../../../selectors';

import Chat from './Chat';


const mapState = createStructuredSelector({
  messages: getChatMessages,
  activeRoom: getActiveChat,
});

const mapDispatch = {
  // onGetMessages: getChatMessages.trigger,
  onSendMessage: sendChatMessage.trigger,
};


export default connect(mapState, mapDispatch)(Chat);
