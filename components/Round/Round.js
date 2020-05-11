import * as React from 'react';
import PropTypes from 'prop-types';
import { Button, Layout, Text } from '@ui-kitten/components';

import { usePrev } from '../../hooks';

import styles from './styles';


const RoundScreen = (props) => {
  const {
    activePlayerName,
    allowAnswers,
    answers,
    currentList,
    diceVal,
    hideList,
    onAllowAnswers,
    onHideList,
    onNextRound,
    onReRoll,
    onSetAnswers,
    onShowTimer,
    onStartRound,
    playerIsActive,
    roll,
    roundActive,
    showTimer,
  } = props;

  const prevRoll = usePrev(roll);
  const prevRoundActive = usePrev(roundActive);
  const prevCurrentList = usePrev(currentList);

  const handleNextRound = React.useCallback(() => {
    onShowTimer(true);
    onHideList(true);
    onSetAnswers([]);
    onNextRound();
  }, [onHideList, onNextRound, onSetAnswers, onShowTimer]);

  const handleStartRound = React.useCallback(() => {
    onAllowAnswers(true);
    onHideList(false);
    onStartRound();
  }, [onAllowAnswers, onHideList, onStartRound]);

  const handleRoundEnd = React.useCallback(() => {
    onAllowAnswers(false);
  }, [onAllowAnswers]);

  const handleResetDiceRoll = React.useCallback(() => {
    onReRoll();
    onAllowAnswers(false);
    onHideList(true);
  }, [onAllowAnswers, onHideList, onReRoll]);

  React.useEffect(() => {
    if (Boolean(prevRoll && !roll)) {
      handleResetDiceRoll();
    }
  }, [roll, prevRoll, handleResetDiceRoll]);

  React.useEffect(() => {
    if (!prevRoundActive && roundActive) {
      handleStartRound();
    } else if (!roundActive && prevRoundActive) {
      handleRoundEnd();
    }
  }, [prevRoundActive, roundActive, handleStartRound, handleRoundEnd, answers]);

  React.useEffect(() => {
    if (currentList > prevCurrentList) {
      handleNextRound();
    }
  }, [currentList, prevCurrentList, handleNextRound]);

  const disableStartButton = allowAnswers || !hideList;

  if (!diceVal) {
    return null;
  }

  return (
    <Layout style={styles.container}>
      <Layout style={styles.buttonsContainer}>
        {!playerIsActive && !allowAnswers && (
          <Text category="s1">
            {`${activePlayerName} can start!`}
          </Text>
        )}

        {!disableStartButton && playerIsActive && (
          <Button
            style={styles.startButton}
            disabled={disableStartButton}
            onPress={handleStartRound}
          >
            Start
          </Button>
        )}

        {!disableStartButton && playerIsActive && (
          <Button
            disabled={disableStartButton}
            onPress={onReRoll}
          >
            Reroll
          </Button>
        )}
      </Layout>
    </Layout>
  );
};

RoundScreen.navigationOptions = {
  header: null,
};

RoundScreen.propTypes = {
  activePlayerName: PropTypes.string.isRequired,
  allowAnswers: PropTypes.bool.isRequired,
  answers: PropTypes.array.isRequired,
  currentList: PropTypes.number.isRequired,
  diceVal: PropTypes.string,
  hideList: PropTypes.bool.isRequired,
  onAllowAnswers: PropTypes.func.isRequired,
  onHideList: PropTypes.func.isRequired,
  onNextRound: PropTypes.func.isRequired,
  onReRoll: PropTypes.func.isRequired,
  onSetAnswers: PropTypes.func.isRequired,
  onShowTimer: PropTypes.func.isRequired,
  onStartRound: PropTypes.func.isRequired,
  playerIsActive: PropTypes.bool.isRequired,
  roll: PropTypes.string,
  roundActive: PropTypes.bool.isRequired,
  showTimer: PropTypes.bool.isRequired,
};

RoundScreen.defaultProps = {
  diceVal: undefined,
  roll: undefined,
};


export default RoundScreen;
