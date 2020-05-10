import {
  closeModal,
  gotResponses,
  nextRound,
  openModal,
} from '../../actions';


const modalState = {
  isOpen: false,
  responses: [],
};

const modal = (state = modalState, action = {}) => {
  switch (action.type) {
    case gotResponses.SUCCESS:
      return {
        ...state,
        isOpen: true,
        responses: action.payload.responses,
      };

    case openModal.TRIGGER:
      return {
        ...state,
        isOpen: true,
      };

    case closeModal.TRIGGER:
      return {
        ...state,
        isOpen: false,
      };

    case nextRound.SUCCESS:
      return {
        ...state,
        isOpen: false,
        responses: [],
      };

    default:
      return state;
  }
};


export default modal;
