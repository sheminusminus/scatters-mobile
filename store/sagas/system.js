import { Audio } from 'expo-av';
import * as Permissions from 'expo-permissions';
import { all, call, take, put, spawn } from 'redux-saga/effects';

import {
  permsRequestRecording,
  permsCheckRecording,
  audioStartRecording,
} from '../../actions';

import { Storage } from '../../services';


let sound = null;
let recording = null;

const recordingSettings = JSON.parse(JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY));

let socket;
let events;

function* doRequestRecordingPerms() {
  try {
    const response = yield call(Permissions.askAsync, Permissions.AUDIO_RECORDING);

    console.log('doRequestRecordingPerms', response.status);

    if (response.status === 'granted') {
      yield call(Storage.save, 'audio_recording', 'granted');
      yield put(permsCheckRecording.success({ result: 'granted' }));
    } else {
      yield call(Storage.save, 'audio_recording', 'denied');
      yield put(permsCheckRecording.failure({ result: 'denied' }));
    }
  } catch (error) {
    yield put(permsCheckRecording.failure({ result: 'error' }));
  }
}

export function* checkRecordingPermissions() {
  try {
    const prevResult = yield call(Storage.load, 'audio_recording');

    console.log('checkRecordingPermissions', prevResult);
    if (prevResult) {
      yield put(permsCheckRecording.success({ result: prevResult }));
    }
  } catch (error) {
    yield put(permsCheckRecording.failure({ result: 'denied' }));
  }
}

export function* doAudioRecording() {
  try {
    if (sound !== null) {
      yield call(sound.unloadAsync);
      sound.setOnPlaybackStatusUpdate(null);
      sound = null;
    }

    yield call(Audio.setAudioModeAsync, {
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
    });
    if (recording !== null) {
      recording.setOnRecordingStatusUpdate(null);
      recording = null;
    }
    recording = new Audio.Recording();
    yield call(recording.prepareToRecordAsync, recordingSettings);
    recording.setOnRecordingStatusUpdate((status) => {
      console.log(status);
      if (status.isDoneRecording) {
        console.log('done');
      }
    });
    yield call(recording.startAsync);
  } catch (error) {
    yield put(audioStartRecording.failure(error));
  }
}

/**
 *  Generator function to listen for redux actions
 */
function* watchSystemEvents() {
  while (true) {
    const { type, payload = {} } = yield take([
      permsRequestRecording.TRIGGER,
      permsCheckRecording.TRIGGER,
      audioStartRecording.TRIGGER,
    ]);

    switch (type) {
      case permsCheckRecording.TRIGGER:
        yield spawn(checkRecordingPermissions);
        break;

      case permsRequestRecording.TRIGGER:
        yield spawn(doRequestRecordingPerms);
        break;

      case audioStartRecording.TRIGGER:
        yield spawn(doAudioRecording);
        break;

      default:
        yield null;
        break;
    }
  }
}

function* watch() {
  yield all([
    watchSystemEvents(),
  ]);
}

export default function createSagas(_socket, _events) {
  socket = _socket;
  events = _events;
  return watch;
};
