import { all, call, delay, take, put, select, spawn } from 'redux-saga/effects';

import {
  getStatus,
  gotResponses,
  nextRound,
  resetDiceRoll,
  rollDice,
  roundAllowAnswers,
  roundHideList,
  roundScored,
  roundShowTimer,
  sendAnswers,
  sendTallies,
  setGamePhase,
  setRound,
  startGame,
  startRound,
} from '../../actions';

import { GamePhase } from '../../constants';

import { navigate, navigateBack } from '../../navigation';

import {
  getPlayerName,
  getRoundAnswers,
} from '../../selectors';


let socket;
let events;


function* navToGame() {
  // navigate('Game');
  yield call(navigate, 'Game');
  yield null;
}

function* navToList() {
  // navigate('Modal', { Screen: 'List' });
  yield call(navigate, 'List');
  yield null;
}

function* navToResponses() {
  console.log('nav to responses');
  // navigate('Modal', { Screen: 'Responses' });
  yield call(navigate, 'Responses');
}

function* navToScores() {
  // navigate('Modal', { Screen: 'Scores' });
  yield call(navigate, 'Modal', { Screen: 'Scores' });
  yield null;
}

function* doStartGame() {
  try {
    socket.emit(events.START_GAME);
  } catch (error) {
    yield put(startGame.failure(error));
  }
}

function* doRollDice() {
  try {
    socket.emit(events.ROLL_DICE);
  } catch (error) {
    yield put(rollDice.failure(error));
  }
}

function* doResetDiceRoll() {
  try {
    socket.emit(events.RESET_DICE_ROLL);
  } catch (error) {
    yield put(resetDiceRoll.failure(error));
  }
}

function* doStartRound() {
  try {
    socket.emit(events.START_ROUND);
  } catch (error) {
    yield put(startRound.failure(error));
  }
}

function* doSendAnswers() {
  try {
    const name = yield select(getPlayerName);
    const answers = yield select(getRoundAnswers);
    socket.emit(events.SEND_ANSWERS, { answers, name });
  } catch (error) {
    yield put(sendAnswers.failure(error));
  }
}

function* doSendTallies(data) {
  try {
    socket.emit(events.SEND_TALLIES, data);
  } catch (error) {
    yield put(sendTallies.failure(error));
  }
}

function* doGotResponses(data) {
  try {
    // navigate('Modal', { Screen: 'Responses' });
    yield call(navigate, 'Responses');
    yield put(gotResponses.success(data));
  } catch (error) {
    yield put(gotResponses.failure(error));
  }
}

function* doRoundScored() {
  try {
    // navigate('Modal', { Screen: 'Scores' });
    yield call(navigate, 'Modal', { Screen: 'Scores' });
  } catch (error) {
    yield put(gotResponses.failure(error));
  }
}

function* doNextRound() {
  try {
    socket.emit(events.NEXT_ROUND);
  } catch (error) {
    yield put(gotResponses.failure(error));
  }
}

function* doNextRoundSuccess() {
  try {
    // navigate('Game');
    yield call(navigate, 'Game');
  } catch (error) {
    yield put(gotResponses.failure(error));
  }
}

function* doGetStatus() {
  try {
    socket.emit(events.GET_STATUS, {});
  } catch (error) {
    yield put(getStatus.failure(error));
  }
}

function* doSetGamePhase(payload) {
  try {
    switch (payload.phase) {
      case GamePhase.NOT_STARTED:
        yield null;
        return;

      case GamePhase.ROLL:
        yield spawn(navToGame);
        return;

      case GamePhase.LIST:
        yield all([
          put(roundAllowAnswers.trigger(true)),
          put(roundShowTimer.trigger(true)),
          put(roundHideList.trigger(false))
        ].filter(Boolean));
        yield spawn(navToList);
        break;

      case GamePhase.VOTE:
        yield put(roundAllowAnswers.trigger(false));
        yield delay(2000);
        yield all([
          put(sendAnswers.trigger()),
          put(roundShowTimer.trigger(false)),
          put(roundHideList.trigger(true)),
        ]);
        yield spawn(navToResponses);
        break;

      case GamePhase.SCORES:
        yield spawn(navToScores);
        break;

      default:
        yield null;
        break;
    }
  } catch (error) {
    yield put(setGamePhase.failure(error));
  }
}

function* doSetRound(payload) {
  try {
    socket.emit(events.SET_ROUND, payload);
  } catch (error) {
    yield put(getStatus.failure(error));
  }
}

/**
 *  Generator function to listen for redux actions
 */
function* watchGameEvents() {
  while (true) {
    const { type, payload = {} } = yield take([
      nextRound.SUCCESS,
      nextRound.TRIGGER,
      resetDiceRoll.TRIGGER,
      rollDice.TRIGGER,
      roundScored.SUCCESS,
      sendAnswers.TRIGGER,
      sendTallies.TRIGGER,
      setGamePhase.SUCCESS,
      setRound.TRIGGER,
      startGame.SUCCESS,
      startGame.TRIGGER,
      startRound.TRIGGER,
    ]);

    switch (type) {
      case startGame.TRIGGER:
        yield spawn(doStartGame);
        break;

      case startGame.SUCCESS:
        yield spawn(navToGame);
        break;

      case resetDiceRoll.TRIGGER:
        yield spawn(doResetDiceRoll);
        break;

      case rollDice.TRIGGER:
        yield spawn(doRollDice);
        break;

      case startRound.TRIGGER:
        yield spawn(doStartRound);
        break;

      case sendAnswers.TRIGGER:
        yield spawn(doSendAnswers);
        break;

      case sendTallies.TRIGGER:
        yield spawn(doSendTallies, payload);
        break;

      case gotResponses.TRIGGER:
        yield spawn(doGotResponses, payload);
        break;

      case nextRound.TRIGGER:
        yield spawn(doNextRound);
        break;

      case nextRound.SUCCESS:
        yield spawn(doNextRoundSuccess);
        break;

      case getStatus.TRIGGER:
        yield spawn(doGetStatus);
        break;

      case setGamePhase.SUCCESS:
        yield spawn(doSetGamePhase, payload);
        break;

      case roundScored.SUCCESS:
        yield spawn(doRoundScored);
        break;

      case setRound.TRIGGER:
        yield spawn(doSetRound, payload);
        break;

      default:
        yield null;
        break;
    }
  }
}

function* watch() {
  yield all([
    watchGameEvents(),
  ]);
}

export default function createSagas(_socket, _events) {
  socket = _socket;
  events = _events;
  return watch;
};
