import React from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Layout, Input, Text } from '@ui-kitten/components';

import { rollDice } from '../actions';
import {
  getGameEndTime,
  getGameStartTime,
  getGameTimeElapsed,
} from '../selectors';

import { usePrev } from '../hooks';
import { sizes } from '../constants';


const { width } = Dimensions.get('window');

const timerHeight = 6;
const timerFullWidth = (width - (sizes.spacing.SM * 2)) * 0.85;

const styles = StyleSheet.create({
  timerContainer: {
    width: timerFullWidth,
    height: timerHeight,
    alignSelf: 'center',
    borderRadius: 3,
  },
  timer: {
    backgroundColor: 'pink',
    height: timerHeight,
    borderRadius: 3,
  },
});

const Timer = ({ startTime, endTime, timeElapsed }) => {
  const prevStartTime = usePrev(startTime);
  const width = React.useRef(new Animated.Value(timerFullWidth)).current;
  const duration = endTime - startTime;
  const warnElapsed = duration * 0.5;
  const dangerElapsed = duration * 0.75;

  const handleWidth = React.useCallback((toValue, duration) => {
    Animated.timing(width, {
      toValue,
      duration,
    }).start()
  }, []);

  React.useEffect(() => {
    if (prevStartTime === -1 && startTime > -1) {
      handleWidth(0, endTime - startTime);
    } else if (prevStartTime > 0 && startTime <= 0) {
      handleWidth(timerFullWidth, 100);
    }
  }, [endTime, startTime, prevStartTime, handleWidth]);

  let bgColor = 'rgb(0, 224, 150)';
  if (timeElapsed > -1) {
    if (timeElapsed >= warnElapsed) {
      bgColor = 'rgb(255, 61, 113)';
    } else if (timeElapsed >= dangerElapsed) {
      bgColor = 'rgb(255, 170, 0)';
    }
  }

  return (
    <Layout style={styles.timerContainer} level="4">
      <Animated.View
        style={[
          styles.timer,
          {
            backgroundColor: bgColor,
          },
          {
            width,
          },
        ]}
      />
    </Layout>
  );
};

const mapState = createStructuredSelector({
  endTime: getGameEndTime,
  startTime: getGameStartTime,
  timeElapsed: getGameTimeElapsed,
});

const mapDispatch = {
  onRollDice: rollDice.trigger,
};


export default connect(mapState, mapDispatch)(Timer);
