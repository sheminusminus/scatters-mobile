import { all, call, delay, take, put, spawn } from 'redux-saga/effects';

import {
  emitName,
  joinRoom,
  retrieveName,
} from '../../actions';

import { navigate } from '../../navigation';

import { Storage } from '../../services';


let socket;
let events;

function* doEmitName(payload) {
  try {
    yield call(Storage.save, 'name', payload.name);
    socket.emit(events.EMIT_NAME, payload);
  } catch (error) {
    yield put(emitName.failure(error));
  }
}

function* doRetrieveName() {
  try {
    const name = yield call(Storage.load, 'name');
    if (name) {
      yield put(retrieveName.success());
      yield put(emitName.trigger({ name }));
    } else {
      yield delay(1000);
      yield put(retrieveName.failure());
    }
  } catch (error) {
    yield put(emitName.failure(error));
  }
}

function* navToStart(name) {
  navigate('Start');
  yield null;
}

/**
 *  Generator function to listen for redux actions
 */
function* watchPlayerEvents() {
  while (true) {
    const { type, payload = {} } = yield take([
      emitName.TRIGGER,
      joinRoom.SUCCESS,
      retrieveName.TRIGGER,
    ]);

    switch (type) {
      case emitName.TRIGGER:
        yield spawn(doEmitName, payload);
        break;

      case joinRoom.SUCCESS:
        yield spawn(navToStart, payload.name);
        break;

      case retrieveName.TRIGGER:
        yield spawn(doRetrieveName);
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
