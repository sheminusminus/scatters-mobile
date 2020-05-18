import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import StartScreen from './StartContainer';
import { WaitingScreen } from './components';


const StartStack = createStackNavigator();

const StartStackView = () => {
  return (
    <StartStack.Navigator
      initialRouteName="Start"
      mode="modal"
      headerMode="none"
    >
      <StartStack.Screen name="Start" component={StartScreen} />
      <StartStack.Screen name="Waiting" component={WaitingScreen} />
    </StartStack.Navigator>
  );
}


export default StartStackView;
