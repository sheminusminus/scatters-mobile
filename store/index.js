import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reactotron from './ReactotronConfig';

import {
  gotResponses,
  joinRoom,
  nextRound,
  resetDiceRoll,
  rollDice,
  roundEnded,
  roundScored,
  setGamePhase,
  setPlayers,
  setRound,
  startGame,
  startRound,
  timerFired,
} from '../actions';
import { events, socket } from '../services';
import createRootReducer from './reducers';
import createRootSagas from './sagas';


const sagaMonitor = reactotron.createSagaMonitor();

const rootReducer = createRootReducer();

export default () => {
  const rootSagas = createRootSagas(socket, events);

  const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

  const middleware = applyMiddleware(sagaMiddleware);

  const store = createStore(
    rootReducer,
    {},
    compose(
      middleware,
      reactotron.createEnhancer(),
    ),
  );

  sagaMiddleware.run(rootSagas);

  socket.on(events.JOINED_ROOM, (data) => {
    store.dispatch(joinRoom.success(data));
    // TODO: set local storage
    // lsSet('name', data.name);
  });

  socket.on(events.PLAYERS_UPDATED, (data) => {
    store.dispatch(setPlayers.success(data));
  });

  socket.on(events.GAME_STARTED, (data) => {
    store.dispatch(startGame.success(data));
  });

  socket.on(events.DICE_ROLLED, (data) => {
    store.dispatch(rollDice.success(data));
  });

  socket.on(events.DICE_ROLL_RESET, () => {
    store.dispatch(resetDiceRoll.success());
  });

  socket.on(events.ROUND_STARTED, () => {
    console.log(events.ROUND_STARTED);
    store.dispatch(startRound.success());
  });

  socket.on(events.ROUND_ENDED, (data) => {
    store.dispatch(roundEnded.success(data));
  });

  socket.on(events.GOT_RESPONSES, (data) => {
    console.log(events.GOT_RESPONSES, data);
    store.dispatch(gotResponses.trigger(data));
  });

  socket.on(events.TIMER_FIRED, (data) => {
    store.dispatch(timerFired.success(data));
  });

  socket.on(events.ROUND_SCORED, (data) => {
    store.dispatch(roundScored.success(data));
  });

  socket.on(events.NEXT_ROUND, (data) => {
    store.dispatch(nextRound.success(data));
  });

  socket.on(events.GAME_STATUS, (data) => {
    store.dispatch(setGamePhase.trigger(data));
    store.dispatch(setGamePhase.success(data));
  });

  socket.on(events.ROUND_SET, (data) => {
    store.dispatch(setRound.success(data));
  });

  return { store, socket };
};
