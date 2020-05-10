import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  getGameActivePlayerName,
  getGameCurrentList,
  getGameRoll,
  getGameRoundActive,
  getPlayerIsActive,
  getRoundAllowAnswers,
  getRoundHideList,
  getRoundAnswers,
  getRoundShowTimer,
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
  activePlayerName: getGameActivePlayerName,
  allowAnswers: getRoundAllowAnswers,
  answers: getRoundAnswers,
  currentList: getGameCurrentList,
  hideList: getRoundHideList,
  playerIsActive: getPlayerIsActive,
  roll: getGameRoll,
  roundActive: getGameRoundActive,
  showTimer: getRoundShowTimer,
});

const mapDispatch = {
  onAllowAnswers: roundAllowAnswers.trigger,
  onHideList: roundHideList.trigger,
  onSetAnswers: roundSetAnswers.trigger,
  onShowTimer: roundShowTimer.trigger,
  onStartRound: startRound.trigger,
};


export default connect(mapState, mapDispatch)(screen);
