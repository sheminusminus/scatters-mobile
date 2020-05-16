import {
  permsRequestRecording,
  permsCheckRecording,
} from '../../actions';


const systemState = {
  recordingPerm: null,
};

const system = (state = systemState, action = {}) => {
  // noinspection JSUnresolvedVariable
  switch (action.type) {
    case permsRequestRecording.SUCCESS:
      return {
        ...state,
        recordingPerm: 'granted',
      };

    case permsCheckRecording.SUCCESS:
      return {
        ...state,
        recordingPerm: action.payload.result,
      };

    default:
      return state;
  }
};


export default system;
