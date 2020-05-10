import { GamePhase } from '../../constants';

import {
  joinRoom,
  roundScored,
  retrieveName,
} from '../../actions';


const playerState = {
  id: '',
  lookedForName: false,
  name: '',
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

    default:
      return state;
  }
};


export default player;
