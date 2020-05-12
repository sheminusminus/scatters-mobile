import {
  joinRoom,
  roundScored,
  retrieveName,
  gotRooms,
  onConnect,
  onDisconnect,
} from '../../actions';


const playerState = {
  lookedForName: false,
  score: 0,
  username: '',
  connected: false,
};

const player = (state = playerState, action = {}) => {
  switch (action.type) {
    case joinRoom.SUCCESS:
      return {
        ...state,
        ...(action.payload.players.find((p) => p.username === action.payload.username) || {}),
        username: action.payload.username,
      };

    case roundScored.SUCCESS:
      return {
        ...state,
        ...(action.payload.players.find((p) => p.username === state.username) || {}),
      };

    case retrieveName.FAILURE:
    case retrieveName.SUCCESS:
      return {
        ...state,
        lookedForName: true,
      };

    case gotRooms.TRIGGER:
      return {
        ...state,
        username: action.payload.username,
      };

    default:
      return state;
  }
};


export default player;
