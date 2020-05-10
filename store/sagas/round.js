import { all, take, put, spawn } from 'redux-saga/effects';

import {
  roundSetAnswers,
} from '../../actions';


let socket;
let events;

function* doRoundSetAnswers(payload) {
  try {
    yield null;
  } catch (error) {
    yield put(roundSetAnswers.failure(error));
  }
}

/**
 *  Generator function to listen for redux actions
 */
function* watchRoundEvents() {
  while (true) {
    const { type, payload = {} } = yield take([
      roundSetAnswers.TRIGGER,
    ]);

    switch (type) {
      case roundSetAnswers.TRIGGER:
        yield spawn(doRoundSetAnswers, payload);
        break;

      default:
        yield null;
        break;
    }
  }
}

function* watch() {
  yield all([
    watchRoundEvents(),
  ]);
}

export default function createSagas(_socket, _events) {
  socket = _socket;
  events = _events;
  return watch;
};
