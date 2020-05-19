import {
  activateChat,
  chatMessageReceived,
  sendChatMessage,
} from '../../actions';


const chatState = {
  activeChat: null,
  chats: [],
  chatMessages: {},
};

const chats = (state = chatState, action = {}) => {
  switch (action.type) {
    case activateChat.SUCCESS:
      return {
        ...state,
        activeChat: action.payload.chat,
      };

    case chatMessageReceived.SUCCESS:
      return {
        ...state,
        chats: Array.from(new Set([...state.chats, action.payload.chat])),
        chatMessages: {
          ...state.chatMessages,
          [action.payload.chat]: [...(state.chatMessages[action.payload.chat] || []), action.payload.message],
        },
      };

    case sendChatMessage.TRIGGER:
      return {
        ...state,
        chats: Array.from(new Set([...state.chats, action.payload.chat])),
        chatMessages: {
          ...state.chatMessages,
          [action.payload.chat]: [...(state.chatMessages[action.payload.chat] || []), action.payload.message],
        },
      };

    default:
      return state;
  }
};


export default chats;
