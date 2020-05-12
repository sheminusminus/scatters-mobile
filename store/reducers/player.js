import { GamePhase } from '../../constants';

import {
  joinRoom,
  roundScored,
  retrieveName,
  gotRooms,
} from '../../actions';


const playerState = {
  defaultRoomAvailable: false,
  lookedForName: false,
  rooms: null,
  score: 0,
  username: '',
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
        defaultRoomAvailable: action.payload.defaultRoomAvailable,
        username: action.payload.username,
        rooms: action.payload.rooms,
      };

    default:
      return state;
  }
};


export default player;
