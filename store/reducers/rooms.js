import {
  clearRoom,
  gotRooms,
  joinRoom,
  requestAllUsers,
} from '../../actions';


const roomsState = {
  allPlayers: [],
  allRooms: null,
  joinedRooms: null,
  onlinePlayers: [],
  room: '',
};

const rooms = (state = roomsState, action = {}) => {
  switch (action.type) {
    case joinRoom.SUCCESS:
      return {
        ...state,
        allRooms: action.payload.allRooms,
        joinedRooms: action.payload.joinedRooms,
        room: action.payload.room,
      };

    case gotRooms.TRIGGER:
      return {
        ...state,
        allRooms: action.payload.allRooms,
        joinedRooms: action.payload.joinedRooms,
      };

    case clearRoom.SUCCESS:
      return {
        ...state,
        allRooms: action.payload.allRooms,
        joinedRooms: action.payload.joinedRooms,
        room: '',
      };

    case requestAllUsers.SUCCESS:
      return {
        ...state,
        allPlayers: action.payload.allPlayers,
      };

    default:
      return state;
  }
};


export default rooms;
