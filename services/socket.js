import io from 'socket.io-client';

// const socket = io.connect('http://localhost:3050/scatters');
// const socket = io.connect('https://respected-snapdragon-ferry.glitch.me/scatters');
// const socket = io.connect('https://ripe-ink-cuticle.glitch.me/scatters');
// const socket = io.connect('https://spectacular-mint-tire.glitch.me/scatters');
// const socket = io.connect('https://whimsical-cubic-hare.glitch.me/scatters');
// const socket = io.connect('https://shore-oval-mongoose.glitch.me/scatters');
// const socket = io.connect('https://bumpy-helpful-cheese.glitch.me/scatters');
const socket = io.connect('https://scatters.lol/scatters');

export const events = {
  CONNECT: 'connect',
  CONNECT_ERROR: 'connect_error',
  CREATE_ROOM: 'create-room',
  DICE_ROLL_RESET: 'dice-roll-reset',
  DICE_ROLLED: 'dice-rolled',
  EMIT_NAME: 'name',
  EXIT_ROOM: 'exit-room',
  GAME_STARTED: 'game-started',
  GAME_STATUS: 'game-status',
  GET_STATUS: 'get-status',
  GOT_RESPONSES: 'got-responses',
  JOINED_ROOM: 'joined-room',
  LIST_ROOMS: 'list-rooms',
  NEXT_ROUND: 'next-round',
  PLAYERS_UPDATED: 'players-updated',
  REQUEST_ROOM: 'request-room',
  RESET_DICE_ROLL: 'reset-dice-roll',
  ROLL_DICE: 'roll-dice',
  ROOM_CREATED: 'room-created',
  ROOM_CREATED_ERROR: 'room-created-error',
  ROOM_EXITED: 'room-exited',
  ROOMS_JOINED: 'rooms-joined',
  ROUND_ENDED: 'round-ended',
  ROUND_SCORED: 'round-scored',
  ROUND_SET: 'round-set',
  ROUND_STARTED: 'round-started',
  SEND_ANSWERS: 'send-answers',
  SEND_TALLIES: 'send-tallies',
  SET_ROUND: 'set-round',
  START_GAME: 'start-game',
  START_ROUND: 'start-round',
  TIMER_FIRED: 'timer-fired',
  WAIT_NEXT_ROUND: 'wait-next-round',

  PRESENCE_GET_ONLINE_USERS: 'presence-get-online-users',
  PRESENCE_GET_ALL_USERS: 'presence-get-all-users',

  INVITES_GET_TO_ME: 'invites-get-to-me',
  INVITES_GET_FROM_ME: 'invites-get-from-me',
  INVITES_SEND_FOR_ROOM: 'invites-send-for-room',

  CONFIRM_PUSH_SENT: 'confirm-push-sent',
  SEND_PUSH: 'send-push',
  SET_PUSH_TOKEN: 'set-push-token',
};

const oneTimeEvents = [];

socket.on('connect', () => {
  console.log('connected');
  socket.emit('connected');
});

socket.on('connect_error', () => {
  console.log('connection error');
});

window.socket = socket;

export const emit = (event, ...args) => {
  socket.emit(event, ...args);
};

export const on = (event, ...args) => {
  if (oneTimeEvents.includes(event)) {
    return socket.once(event, ...args);
  }

  return socket.on(event, ...args);
};

export const onDisconnect = () => {
  oneTimeEvents.forEach((evt) => {
    socket.removeAllListeners(evt);
  });
  return socket;
};

socket.on('disconnect', onDisconnect);


export default socket;

