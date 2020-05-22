import {
  activateChat,
  chatMessageReceived,
  sendChatMessage,
  getChatMessages,
  clearChat,
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

    case sendChatMessage.REQUEST:
    case chatMessageReceived.SUCCESS:
      return {
        ...state,
        chats: Array.from(new Set([...state.chats, action.payload.room])),
        chatMessages: {
          ...state.chatMessages,
          [action.payload.room]: [
            ...(state.chatMessages[action.payload.room] || []),
            {
              username: action.payload.username,
              text: action.payload.text,
            },
          ],
        },
      };

    case clearChat.TRIGGER:
      return {
        ...state,
        chatMessages: Object.keys(state.chatMessages).reduce((obj, key) => ({
          ...obj,
          [key]: [],
        }), {}),
      };
    // case sendChatMessage.TRIGGER:
    //   return {
    //     ...state,
    //     chats: Array.from(new Set([...state.chats, action.payload.room])),
    //     chatMessages: {
    //       ...state.chatMessages,
    //       [action.payload.room]: [
    //         ...(state.chatMessages[action.payload.room] || []),
    //
    //       ],
    //     },
    //   };

    // case getChatMessages.SUCCESS:
    //   return {
    //     ...state,
    //     chatMessages: {
    //       ...state.chatMessages,
    //       chats: Array.from(new Set([...state.chats, action.payload.chat])),
    //       [action.payload.chat]: [...(state.chatMessages[action.payload.chat] || []), action.payload.message],
    //     },
    //   };

    default:
      return state;
  }
};


export default chats;
