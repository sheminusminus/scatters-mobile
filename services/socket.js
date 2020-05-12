import io from 'socket.io-client';

// const socket = io.connect('http://localhost:3050/scatters');
// const socket = io.connect('https://respected-snapdragon-ferry.glitch.me/scatters');
const socket = io.connect('https://ripe-ink-cuticle.glitch.me/scatters');


export const events = {
  CONNECT: 'connect',
  CONNECT_ERROR: 'connect_error',
  DICE_ROLL_RESET: 'dice-roll-reset',
  DICE_ROLLED: 'dice-rolled',
  EMIT_NAME: 'name',
  GAME_STARTED: 'game-started',
  GAME_STATUS: 'game-status',
  GET_STATUS: 'get-status',
  GOT_RESPONSES: 'got-responses',
  JOINED_ROOM: 'joined-room',
  NEXT_ROUND: 'next-round',
  PLAYERS_UPDATED: 'players-updated',
  REQUEST_ROOM: 'request-room',
  RESET_DICE_ROLL: 'reset-dice-roll',
  ROLL_DICE: 'roll-dice',
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
};

const oneTimeEvents = [
  events.GAME_STARTED,
  events.JOINED_ROOM,
];

socket.on('connect', () => {
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

