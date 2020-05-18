import { create } from 'react-native/jest/renderer';
import { all, call, delay, take, put, spawn, select } from 'redux-saga/effects';

import {
  createRoom,
  emitName,
  gotRooms,
  joinRoom,
  requestListRooms,
  requestRoom,
  retrieveName,
} from '../../actions';

import { RoomVisibility, RoomType } from '../../constants';

import { getActiveRoom, getUsername } from '../../selectors';

import { navigate } from '../../navigation';

import { Storage } from '../../services';


let socket;
let events;

function* doEmitName(payload) {
  try {
    const pushToken = yield call(Storage.load, Storage.kToken);
    yield call(Storage.save, Storage.kNAME, payload.username);
    socket.emit(events.EMIT_NAME, { ...payload, pushToken });
  } catch (error) {
    yield put(emitName.failure(error));
  }
}

function* doGotRooms(data) {
  try {
    yield call(navigate, 'Rooms');
  } catch (error) {
    yield put(gotRooms.failure(error));
  }
}

function* doRetrieveName() {
  try {
    const username = yield call(Storage.load, Storage.kNAME);
    const pushToken = yield call(Storage.load, Storage.kToken);

    if (username) {
      yield put(retrieveName.success());
      yield put(emitName.trigger({ username, pushToken }));
    } else {
      yield delay(1000);
      yield put(retrieveName.failure());
    }
  } catch (error) {
    yield put(emitName.failure(error));
  }
}

function* navToStart() {
  navigate('Start');
  yield null;
}

function* doRequestRoom(room) {
  try {
    const username = yield select(getUsername);
    socket.emit(events.REQUEST_ROOM, { room, username });
  } catch (error) {
    yield put(emitName.failure(error));
  }
}

function* doCreateRoom(payload) {
  try {
    const { isRealtime, isPrivate, room } = payload;
    const username = yield select(getUsername);
    const type = isRealtime ? RoomType.REALTIME : RoomType.ASYNC;
    const visibility = isPrivate ? RoomVisibility.PRIVATE : RoomVisibility.PUBLIC;
    socket.emit(events.CREATE_ROOM, { room, username, type, visibility });
  } catch (error) {
    yield put(createRoom.failure(error));
  }
}

function* doListRooms(payload) {
  try {
    const username = yield select(getUsername);
    const room = yield select(getActiveRoom);
    socket.emit(events.LIST_ROOMS, { room, username });
  } catch (error) {
    yield put(requestListRooms.failure(error));
  }
}

/**
 *  Generator function to listen for redux actions
 */
function* watchPlayerEvents() {
  while (true) {
    const { type, payload = {} } = yield take([
      createRoom.TRIGGER,
      emitName.TRIGGER,
      gotRooms.TRIGGER,
      joinRoom.SUCCESS,
      requestListRooms.TRIGGER,
      requestRoom.TRIGGER,
      retrieveName.TRIGGER,
    ]);

    switch (type) {
      case emitName.TRIGGER:
        yield spawn(doEmitName, payload);
        break;

      case joinRoom.SUCCESS:
        yield spawn(navToStart, payload.username);
        break;

      case retrieveName.TRIGGER:
        yield spawn(doRetrieveName);
        break;

      case gotRooms.TRIGGER:
        yield spawn(doGotRooms, payload);
        break;

      case requestRoom.TRIGGER:
        yield spawn(doRequestRoom, payload);
        break;

      case createRoom.TRIGGER:
        yield spawn(doCreateRoom, payload);
        break;

      case requestListRooms.TRIGGER:
        yield spawn(doListRooms);
        break;

      default:
        yield null;
        break;
    }
  }
}

function* watch() {
  yield all([
    watchPlayerEvents(),
  ]);
}

export default function createSagas(_socket, _events) {
  socket = _socket;
  events = _events;
  return watch;
};
