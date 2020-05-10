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
  StartScreen,
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

const MainScreen = () => {
  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}

      <Stack.Navigator
        headerMode={false}
        initialRouteName="Entry"
      >
        <Stack.Screen
          name="Entry"
          component={EntryScreen}
          options={{ headerShown: false }}
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
          headerMode={false}
          initialRouteName="MainScreen"
          mode="modal"
        >
          <RootStack.Screen
            name="MainScreen"
            component={MainScreen}
            options={{ headerShown: false }}
          />
          {/*<RootStack.Screen name="ModalScreen" component={ModalScreen} />*/}
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
