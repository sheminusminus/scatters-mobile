import {
  roundAllowAnswers,
  roundHideList,
  roundSetAnswers,
  roundShowTimer,
} from '../../actions';


const roundState = {
  allowAnswers: false,
  answers: ['', '', '', '', '', '', '', '', '', '', '', ''],
  hideList: true,
  showTimer: false,
};

const round = (state = roundState, action = {}) => {
  switch (action.type) {
    case roundAllowAnswers.TRIGGER:
      return {
        ...state,
        allowAnswers: action.payload,
      };

    case roundHideList.TRIGGER:
      return {
        ...state,
        hideList: action.payload,
      };

    case roundSetAnswers.TRIGGER:
      return {
        ...state,
        answers: action.payload,
      };

    case roundShowTimer.TRIGGER:
      return {
        ...state,
        showTimer: action.payload,
      };

    default:
      return state;
  }
};


export default round;
