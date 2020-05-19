import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { sendChatMessage } from '../../actions';
import { getMessagesForActiveChat } from '../../selectors';

import Chat from './Chat';


const mapState = createStructuredSelector({
  messages: getMessagesForActiveChat,
});

const mapDispatch = {
  onSendMessage: sendChatMessage.trigger,
};


export default connect(mapState, mapDispatch)(Chat);
