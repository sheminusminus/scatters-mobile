import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  getActivePlayerUsername,
  getCurrentList,
  getRoll,
  getActiveRound,
  getPlayerIsActive,
  getAnsweringIsAllowed,
  getShouldHideList,
  getAnswers,
  getShouldShowTimer,
} from '../../selectors';

import {
  roundAllowAnswers,
  roundHideList,
  roundSetAnswers,
  roundShowTimer,
  startRound,
} from '../../actions';

import screen from './Round';


const mapState = createStructuredSelector({
  activePlayerName: getActivePlayerUsername,
  allowAnswers: getAnsweringIsAllowed,
  answers: getAnswers,
  currentList: getCurrentList,
  hideList: getShouldHideList,
  playerIsActive: getPlayerIsActive,
  roll: getRoll,
  roundActive: getActiveRound,
  showTimer: getShouldShowTimer,
});

const mapDispatch = {
  onAllowAnswers: roundAllowAnswers.trigger,
  onHideList: roundHideList.trigger,
  onSetAnswers: roundSetAnswers.trigger,
  onShowTimer: roundShowTimer.trigger,
  onStartRound: startRound.trigger,
};


export default connect(mapState, mapDispatch)(screen);
