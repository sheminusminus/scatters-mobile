import {
  joinRoom,
  gotRooms,
} from '../../actions';


const roomsState = {
  allRooms: null,
  joinedRooms: null,
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

    default:
      return state;
  }
};


export default rooms;
