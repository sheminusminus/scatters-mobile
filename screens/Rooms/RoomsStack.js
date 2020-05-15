import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import RoomsScreen from './RoomsContainer';
import { CreateScreen } from './components';


const RoomsStack = createStackNavigator();

const RoomsStackView = () => {
  return (
    <RoomsStack.Navigator
      initialRouteName="Rooms"
      mode="modal"
      headerMode="none"
    >
      <RoomsStack.Screen name="Rooms" component={RoomsScreen} />
      <RoomsStack.Screen name="Create" component={CreateScreen} />
    </RoomsStack.Navigator>
  );
}


export default RoomsStackView;
