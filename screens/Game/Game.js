import * as React from 'react';
import PropTypes from 'prop-types';
import { Animated, Dimensions, Easing, TouchableOpacity } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

import { Dice, PopBack, Round } from '../../components';

import styles, { diceSize } from './styles';

const { height, width } = Dimensions.get('window');

const midX = (width * 0.5) - (diceSize * 0.5);
const midY = (height * 0.5) - (diceSize * 0.5);

const GameScreen = (props) => {
  const {
    activePlayerName,
    onResetDice,
    onRollDice,
    playerIsActive,
    roll,
    timeLeft,
  } = props;

  const diceRef = React.useRef(null);
  const translateX = React.useRef(new Animated.Value(midX)).current;
  const translateY = React.useRef(new Animated.Value(midY)).current;
  const animateColor = React.useRef(new Animated.Value(0)).current;
  const fade = React.useRef(new Animated.Value(1)).current;

  const [diceVal, setDiceVal] = React.useState(roll);
  const [isRolling, setIsRolling] = React.useState(false);

  const handleTranslate = (toX, toY, colorTo, fadeTo) => {
    if (fadeTo === 0) {
      Animated.timing(fade, {
        toValue: fadeTo,
        duration: 400,
      }).start();
    }
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: toX,
        duration: 1200,
        easing: Easing.bounce,
      }),
      Animated.timing(translateY, {
        toValue: toY,
        duration: 1200,
        easing: Easing.bounce,
      }),
      Animated.timing(animateColor, {
        toValue: colorTo,
        duration: 1200,
      }),
    ]).start();
    if (fadeTo === 1) {
      Animated.timing(fade, {
        toValue: fadeTo,
        duration: 400,
        delay: 200,
      }).start();
    }
  };

  const backgroundColor = animateColor.interpolate({
    inputRange: [0, 100],
    outputRange: ['rgb(255, 255, 255)', 'transparent'],
  });

  const color = animateColor.interpolate({
    inputRange: [0, 100],
    outputRange: ['rgb(34, 34, 34)', 'rgba(255, 255, 255, 0.8)'],
  });

  return (
    <Layout style={styles.container}>
      <Animated.View style={[styles.messageContainer, { opacity: fade }]}>
        {!diceVal && !isRolling && (
          <Text category="label" style={styles.message}>
            {`🎲  ${playerIsActive ? 'Your' : `${activePlayerName}'s`} turn to roll  🎲`}
          </Text>
        )}
      </Animated.View>

      <Round
        diceVal={diceVal}
        onNextRound={() => {
          setDiceVal(null);
        }}
        onReRoll={() => {
          setDiceVal(null);
          setIsRolling(false);
          if (diceRef.current) {
            diceRef.current.reroll();
          }
          onResetDice();
          handleTranslate(midX, midY, 0, 1);
        }}
      />

      <Animated.View
        style={[
          styles.diceContainer,
          {
            top: translateY,
          },
          {
            left: translateX,
          },
          {
            backgroundColor,
          },
        ]}
      >
        <TouchableOpacity
          disabled={isRolling}
          onPress={() => {
            onRollDice();
            setIsRolling(true);
          }}
          style={styles.dice}
        >
          <Animated.Text
            style={[
              { width: '100%', textAlign: 'center', fontSize: 28, fontWeight: 'bold' },
              { color },
            ]}
          >
            <Dice
              isActivePlayer={playerIsActive}
              isDisabled={Boolean(diceVal)}
              onValue={(val) => {
                setDiceVal(val);
                handleTranslate(8, 24, 100, 0);
              }}
              ref={diceRef}
              roll={roll}
              showProgress={false}
              sides={20}
              timeLeft={timeLeft}
            />
          </Animated.Text>
        </TouchableOpacity>
      </Animated.View>

      {!isRolling && !diceVal && (
        <PopBack style={{ position: 'absolute', top: 40 }} />
      )}
    </Layout>
  );
};

GameScreen.navigationOptions = {
  header: null,
};

GameScreen.propTypes = {
  activePlayerName: PropTypes.string.isRequired,
  onResetDice: PropTypes.func.isRequired,
  onRollDice: PropTypes.func.isRequired,
  playerIsActive: PropTypes.bool,
  roll: PropTypes.string,
  timeLeft: PropTypes.number.isRequired,
};

GameScreen.defaultProps = {
  roll: null,
  playerIsActive: false,
};


export default GameScreen;
