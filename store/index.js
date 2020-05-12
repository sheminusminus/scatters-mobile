import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
// import { composeWithDevTools } from 'remote-redux-devtools';

import {
  emitName,
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
  gotRooms,
  requestAllUsers,
  requestOnlineUsers,
  requestInvitesToMe,
  requestInvitesFromMe,
  requestRoom,
  sendInviteForRoom,
} from '../actions';
import { getPlayerName, getRoomsRoom } from '../selectors';
import { events, socket } from '../services';
import createRootReducer from './reducers';
import createRootSagas from './sagas';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = createRootReducer();

export default () => {
  console.log('store setup');
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

  socket.on(events.CONNECT, () => {
    socket.emit('connected');
    const state = store.getState();
    const username = getPlayerName(state);
    const room = getRoomsRoom(state);
    if (username) {
      store.dispatch(emitName.trigger({ username }));
    }
    if (room) {
      store.dispatch(requestRoom.trigger(room));
    }
  });

  socket.on(events.LIST_ROOMS, (data) => {
    console.log(events.LIST_ROOMS, data);
    store.dispatch(gotRooms.trigger(data));
  });

  socket.on(events.JOINED_ROOM, (data) => {
    console.log(events.JOINED_ROOM, data);
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
    console.log(events.PRESENCE_GET_ONLINE_USERS, data);
    store.dispatch(requestOnlineUsers.success(data));
  });

  socket.on(events.PRESENCE_GET_ALL_USERS, (data) => {
    console.log(events.PRESENCE_GET_ALL_USERS, data);
    store.dispatch(requestAllUsers.success(data));
  });

  socket.on(events.INVITES_GET_TO_ME, (data) => {
    console.log(events.INVITES_GET_TO_ME, data);
    store.dispatch(requestInvitesToMe.success(data));
  });

  socket.on(events.INVITES_GET_FROM_ME, (data) => {
    console.log(events.INVITES_GET_FROM_ME, data);
    store.dispatch(requestInvitesFromMe.success(data));
  });

  socket.on(events.INVITES_SEND_FOR_ROOM, (data) => {
    console.log(events.INVITES_SEND_FOR_ROOM, data);
    store.dispatch(sendInviteForRoom.success(data));
  });

  return { store, socket };
};
