import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import GameScreen from './GameContainer';
import { WaitingScreen } from './components';


const GameStack = createStackNavigator();

const GameStackView = () => {
  return (
    <GameStack.Navigator
      initialRouteName="Game"
      mode="modal"
      headerMode="none"
    >
      <GameStack.Screen name="Game" component={GameScreen} />
      <GameStack.Screen name="Waiting" component={WaitingScreen} />
    </GameStack.Navigator>
  );
}


export default GameStackView;
