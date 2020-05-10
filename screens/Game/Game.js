import * as React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Layout, Text } from '@ui-kitten/components';

import { Dice, Round } from '../../components';

import styles from './styles';


const GameScreen = (props) => {
  const {
    activePlayer,
    activePlayerName,
    id,
    onRollDice,
    roll,
    timeLeft,
    onResetDice,
    playerIsActive,
  } = props;

  const [diceVal, setDiceVal] = React.useState(roll);
  const [isRolling, setIsRolling] = React.useState(false);
  const diceRef = React.useRef(null);

  return (
    <Layout style={styles.container}>
      <Round
        diceVal={diceVal}
        onNextRound={() => {
          setDiceVal(null);
        }}
        onReRoll={() => {
          setDiceVal(null);
          if (diceRef.current) {
            diceRef.current.reroll();
          }
          onResetDice();
        }}
      />

      <Layout style={styles.diceContainer}>
        <Dice
          onClick={() => {
            onRollDice();
            setIsRolling(true);
          }}
          isActivePlayer={id === activePlayer}
          isDisabled={Boolean(diceVal)}
          onValue={(val) => {
            setDiceVal(val);
          }}
          ref={diceRef}
          sides={20}
          showProgress={false}
          roll={roll}
          timeLeft={timeLeft}
        />
      </Layout>

      <Layout style={styles.messageContainer}>
        {!diceVal && !isRolling && (
          <Text category="s1" style={styles.message}>
            {`${playerIsActive ? 'Your' : `${activePlayerName}'s`} turn to roll`}
          </Text>
        )}
      </Layout>
    </Layout>
  );
};

GameScreen.navigationOptions = {
  header: null,
};

GameScreen.propTypes = {
  activePlayer: PropTypes.string.isRequired,
  activePlayerName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onRollDice: PropTypes.func.isRequired,
  roll: PropTypes.string,
  timeLeft: PropTypes.number.isRequired,
  onResetDice: PropTypes.func.isRequired,
  playerIsActive: PropTypes.bool,
};

GameScreen.defaultProps = {
  roll: null,
  playerIsActive: false,
};


export default GameScreen;
