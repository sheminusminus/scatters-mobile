import * as eva from '@eva-design/eva';
import * as React from 'react';
import { ApplicationProvider } from '@ui-kitten/components';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';

import useCachedResources from './hooks/useCachedResources';

import { LinkingConfiguration, navigationRef } from './navigation';

import {
  EntryScreen,
  GameScreen,
  ListScreen,
  StartScreen,
  ResponsesScreen,
} from './screens';

import configureStore from './store';


const Stack = createStackNavigator();
const ModalStack = createStackNavigator();
const RootStack = createStackNavigator();

const { store } = configureStore();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const ModalScreen = () => {
  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}

      <ModalStack.Navigator
        headerMode="none"
      >
        <ModalStack.Screen
          name="List"
          component={ListScreen}
        />
        <ModalStack.Screen
          name="Responses"
          component={ResponsesScreen}
        />
      </ModalStack.Navigator>
    </View>
  );
};

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
          initialRouteName="Main"
          mode="modal"
          headerMode="none"
        >
          <RootStack.Screen
            name="Main"
            component={MainScreen}
          />
          <RootStack.Screen
            name="Modal"
            component={ModalScreen}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
};

const WrappedApp = () => (
  <Provider store={store}>
    <ApplicationProvider {...eva} theme={eva.dark}>
      <App />
    </ApplicationProvider>
  </Provider>
);

export default WrappedApp;
