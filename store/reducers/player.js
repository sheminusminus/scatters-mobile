import { GamePhase } from '../../constants';

import {
  joinRoom,
  roundScored,
  retrieveName,
  gotRooms,
} from '../../actions';


const playerState = {
  defaultRoomAvailable: false,
  id: '',
  lookedForName: false,
  name: '',
  rooms: null,
  score: 0,
};

const player = (state = playerState, action = {}) => {
  switch (action.type) {
    case joinRoom.SUCCESS:
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        ...(action.payload.players.find((p) => p.id === action.payload.id) || {}),
      };

    case roundScored.SUCCESS:
      return {
        ...state,
        ...(action.payload.players.find((p) => p.id === state.id) || {}),
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
        id: action.payload.id,
        name: action.payload.name,
        rooms: action.payload.rooms,
      };

    default:
      return state;
  }
};


export default player;
