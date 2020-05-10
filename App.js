import * as eva from '@eva-design/eva';
import * as React from 'react';
import { ApplicationProvider } from '@ui-kitten/components';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';

import useCachedResources from './hooks/useCachedResources';

import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';

import { EntryScreen } from './screens';

import configureStore from './store';


const Stack = createStackNavigator();

const { store } = configureStore();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const App = () => {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}

        <NavigationContainer linking={LinkingConfiguration}>
          <Stack.Navigator
            headerMode={false}
            initialRouteName="Entry"
          >
            <Stack.Screen name="Entry" component={EntryScreen} />
            <Stack.Screen name="Root" component={BottomTabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
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
