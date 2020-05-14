import { eventChannel } from 'redux-saga';
import { all, call, take, put, select, spawn, takeEvery } from 'redux-saga/effects';
import { Notifications } from 'expo';
import Constants from 'expo-constants';

import {
  sendPushNotif,
  requestRoom,
} from '../../actions';

import {
  getUsername,
} from '../../selectors';

import { Storage } from '../../services';


let socket;
let events;

export const notificationsChannel = () => {
  return eventChannel((emitter) => {
    const remove = Notifications.addListener(emitter);

    return () => {
      remove();
    };
  });
};

function* doSendPushNotif(payload) {
  console.log(payload);

  try {
    const username = yield select(getUsername);
    const pushToken = yield call(Storage.load, 'pushToken');

    if (pushToken) {
      socket.emit(events.SEND_PUSH, {
        action: 'roomInvite',
        pushToken,
        room: payload.room,
        to: payload.to,
        username,
        id: Constants.manifest.id,
        incrementBadge: 1,
      });
    }
  } catch (error) {
    yield put(sendPushNotif.failure(error));
  }
}

function* handlePushNotifSuccess(payload) {
  try {
    console.log(payload);
    const title = 'Invite sent!';
    yield call(Notifications.presentLocalNotificationAsync, {
      title,
      ios: {
        _displayInForeground: true,
      },
    });
  } catch (err) {
    yield put(sendPushNotif.failure(err));
  }
}

/**
 *  Generator function to listen for redux actions
 */
function* watchNotifsEvents() {
  while (true) {
    const { type, payload = {} } = yield take([
      sendPushNotif.TRIGGER,
    ]);

    switch (type) {
      case sendPushNotif.TRIGGER:
        yield spawn(doSendPushNotif, payload);
        break;

      case sendPushNotif.SUCCESS:
        yield spawn(handlePushNotifSuccess, payload);
        break;

      default:
        yield null;
        break;
    }
  }
}

function* handleNotification(notification) {
  const { actionId, origin, data, remote } = notification;
  const { room, incrementBadge  } = data;

  if (origin === 'selected' || actionId === 'acceptRoomInvite') {
    yield all([
      call(Notifications.setBadgeNumberAsync, 0),
      put(requestRoom.trigger(room)),
    ]);
  } else {
    const badge = yield call(Notifications.getBadgeNumberAsync);
    const nextBadge = incrementBadge ? badge + incrementBadge : badge;
    yield call(Notifications.setBadgeNumberAsync, nextBadge);
  }

  yield null;
}

function* watchNotifChannelEvents() {
  const channel = yield call(notificationsChannel);
  yield takeEvery(channel, handleNotification);
}

function* watch() {
  yield all([
    watchNotifChannelEvents(),
    watchNotifsEvents(),
  ]);
}

export default function createSagas(_socket, _events) {
  socket = _socket;
  events = _events;
  return watch;
};
