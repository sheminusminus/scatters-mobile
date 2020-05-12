import * as eva from '@eva-design/eva';
import * as React from 'react';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { createStackNavigator } from '@react-navigation/stack';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';

import useCachedResources from './hooks/useCachedResources';

import { LinkingConfiguration, navigationRef } from './navigation';

import {
  EntryScreen,
  GameScreen,
  ListScreen,
  ResponsesScreen,
  RoomsScreen,
  ScoresScreen,
  StartScreen,
} from './screens';

import configureStore from './store';


const Stack = createStackNavigator();
const RootStack = createStackNavigator();

const { store } = configureStore();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const MainScreen = () => {
  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}

      <Stack.Navigator
        headerMode="none"
        initialRouteName="Entry"
        mode="card"
      >
        <Stack.Screen
          name="Entry"
          component={EntryScreen}
        />
        <Stack.Screen name="Rooms" component={RoomsScreen} />
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
      </Stack.Navigator>
    </View>
  );
};

const App = () => {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NavigationContainer
        linking={LinkingConfiguration}
        ref={navigationRef}
      >
        <RootStack.Navigator
          initialRouteName="Entry"
          mode="modal"
          headerMode="none"
        >
          {/*<RootStack.Screen*/}
          {/*  name="Main"*/}
          {/*  component={MainScreen}*/}
          {/*/>*/}
          <RootStack.Screen
            name="Entry"
            component={EntryScreen}
          />
          <RootStack.Screen name="Rooms" component={RoomsScreen} />
          <RootStack.Screen name="Start" component={StartScreen} />
          <RootStack.Screen name="Game" component={GameScreen} />
          <RootStack.Screen
            name="List"
            component={ListScreen}
          />
          <RootStack.Screen
            name="Responses"
            component={ResponsesScreen}
          />
          <RootStack.Screen
            name="Scores"
            component={ScoresScreen}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
};

const WrappedApp = () => {
  console.log('~~~~~~~~~~~~`');
  console.log('app started');
  console.log('~~~~~~~~~~~~`');
  return (
    <Provider store={store}>
      <IconRegistry icons={[EvaIconsPack]} />
      <ApplicationProvider {...eva} theme={eva.dark}>
        <App />
      </ApplicationProvider>
    </Provider>
  );
};

export default WrappedApp;
