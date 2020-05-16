import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import {
  clearRoom,
  createRoom,
  emitName,
  gotResponses,
  gotRooms,
  joinRoom,
  nextRound,
  requestAllUsers,
  requestInvitesFromMe,
  requestInvitesToMe,
  requestOnlineUsers,
  resetDiceRoll,
  rollDice,
  roundEnded,
  roundScored,
  sendInviteForRoom,
  sendPushNotif,
  setGamePhase,
  setPlayers,
  setRound,
  startGame,
  startRound,
  timerFired,
} from '../actions';
import { events, socket, Storage } from '../services';
import createRootReducer from './reducers';
import createRootSagas from './sagas';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = createRootReducer();

export default () => {
  const rootSagas = createRootSagas(socket, events);

  const sagaMiddleware = createSagaMiddleware();

  const middleware = applyMiddleware(sagaMiddleware);

  const store = createStore(
    rootReducer,
    {},
    composeEnhancers(
      middleware,
    ),
  );

  sagaMiddleware.run(rootSagas);

  socket.on('reconnect', async () => {
    const username = await Storage.load(Storage.kNAME);
    if (username) {
      store.dispatch(emitName.trigger({ username }));
    }
  });

  socket.on(events.LIST_ROOMS, (data) => {
    store.dispatch(gotRooms.trigger(data));
  });

  socket.on(events.JOINED_ROOM, (data) => {
    store.dispatch(joinRoom.success(data));
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
    store.dispatch(startRound.success());
  });

  socket.on(events.ROUND_ENDED, (data) => {
    store.dispatch(roundEnded.success(data));
  });

  socket.on(events.GOT_RESPONSES, (data) => {
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

  socket.on(events.PRESENCE_GET_ONLINE_USERS, (data) => {
    store.dispatch(requestOnlineUsers.success(data));
  });

  socket.on(events.PRESENCE_GET_ALL_USERS, (data) => {
    store.dispatch(requestAllUsers.success(data));
  });

  socket.on(events.INVITES_GET_TO_ME, (data) => {
    store.dispatch(requestInvitesToMe.success(data));
  });

  socket.on(events.INVITES_GET_FROM_ME, (data) => {
    store.dispatch(requestInvitesFromMe.success(data));
  });

  socket.on(events.INVITES_SEND_FOR_ROOM, (data) => {
    store.dispatch(sendInviteForRoom.success(data));
  });

  socket.on(events.ROOM_EXITED, (data) => {
    store.dispatch(clearRoom.success(data));
  });

  socket.on(events.CONFIRM_PUSH_SENT, (data) => {
    store.dispatch(sendPushNotif.success(data));
  });

  socket.on(events.ROOM_CREATED_ERROR, (data) => {
    console.log(events.ROOM_CREATED_ERROR, data);
    store.dispatch(createRoom.failure(data));
  });

  socket.on(events.ROOM_CREATED, (data) => {
    console.log(events.ROOM_CREATED, data);
    store.dispatch(createRoom.success(data));
  });

  return { store, socket };
};
