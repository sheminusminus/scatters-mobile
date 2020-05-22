import { all, take, put, spawn, select } from 'redux-saga/effects';

import {
  getChatMessages,
  sendChatMessage,
} from '../../actions';

import { getUsername, getActiveRoom, getActiveChat } from '../../selectors';


let socket;
let events;
let chatEvents;

function* doSendChatMessage(payload) {
  try {
    const { room, text } = payload;
    const username = yield select(getUsername);
    yield put(sendChatMessage.request({
      username,
      room,
      text,
    }));
    socket.emit(chatEvents.SEND_MESSAGE, { text, username, room });
  } catch (error) {
    console.log(error);
    yield put(sendChatMessage.failure(error));
  }
}

function* doGetChatMessages() {
  try {
    const username = yield select(getUsername);
    const room = yield select(getActiveChat);
    socket.emit(events.GET_CHAT_MESSAGES, { username, room });
  } catch (error) {
    yield put(sendChatMessage.failure(error));
  }
}

/**
 *  Generator function to listen for redux actions
 */
function* watchChatsEvents() {
  while (true) {
    const { type, payload = {} } = yield take([
      sendChatMessage.TRIGGER,
      // getChatMessages.TRIGGER,
    ]);

    switch (type) {
      case sendChatMessage.TRIGGER:
        yield spawn(doSendChatMessage, payload);
        break;

      // case getChatMessages.TRIGGER:
      //   yield spawn(doGetChatMessages);
      //   break;

      default:
        yield null;
        break;
    }
  }
}

function* watch() {
  yield all([
    watchChatsEvents(),
  ]);
}

export default function createSagas(_socket, _events, _chatEvents) {
  socket = _socket;
  events = _events;
  chatEvents = _chatEvents;
  return watch;
};
