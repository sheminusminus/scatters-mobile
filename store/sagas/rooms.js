import { all, take, put, spawn, select } from 'redux-saga/effects';

import {
  clearRoom,
  requestAllUsers,
  requestOnlineUsers,
} from '../../actions';

import { getUsername, getActiveRoom } from '../../selectors';
import { navigate } from '../../navigation';


let socket;
let events;

function* doClearRoom() {
  try {
    const username = yield select(getUsername);
    const room = yield select(getActiveRoom);
    socket.emit(events.EXIT_ROOM, { username, room });
  } catch (error) {
    yield put(clearRoom.failure(error));
  }
}

function* doNavigateToRooms() {
  try {
    yield call(navigate, 'Rooms');
  } catch (error) {
    yield put(clearRoom.failure(error));
  }
}

function* doRequestAllUsers() {
  try {
    console.log(events.PRESENCE_GET_ALL_USERS, 'requesting?');
    const username = yield select(getUsername);
    const room = yield select(getActiveRoom);
    socket.emit(events.PRESENCE_GET_ALL_USERS, { username, room });
  } catch (error) {
    yield put(requestAllUsers.failure(error));
  }
}

function* doRequestOnlineUsers() {
  try {
    console.log(events.PRESENCE_GET_ONLINE_USERS, 'requesting?');
    const username = yield select(getUsername);
    const room = yield select(getActiveRoom);
    socket.emit(events.PRESENCE_GET_ONLINE_USERS, { username, room });
  } catch (error) {
    yield put(requestOnlineUsers.failure(error));
  }
}

/**
 *  Generator function to listen for redux actions
 */
function* watchRoomEvents() {
  while (true) {
    const { type, payload = {} } = yield take([
      clearRoom.TRIGGER,
      clearRoom.SUCCESS,
      requestAllUsers.TRIGGER,
      requestOnlineUsers.TRIGGER,
    ]);

    switch (type) {
      case clearRoom.TRIGGER:
        yield spawn(doClearRoom);
        break;

      case clearRoom.SUCCESS:
        yield spawn(doNavigateToRooms);
        break;

      case requestAllUsers.TRIGGER:
        yield spawn(doRequestAllUsers);
        break;

      case requestOnlineUsers.TRIGGER:
        yield spawn(doRequestOnlineUsers);
        break;

      default:
        yield null;
        break;
    }
  }
}

function* watch() {
  yield all([
    watchRoomEvents(),
  ]);
}

export default function createSagas(_socket, _events) {
  socket = _socket;
  events = _events;
  return watch;
};
