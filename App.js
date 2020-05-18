import * as Device from 'expo-device';
import * as eva from '@eva-design/eva';
import * as Permissions from 'expo-permissions';
import * as React from 'react';
import Constants from 'expo-constants';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { createStackNavigator } from '@react-navigation/stack';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';
import { Notifications } from 'expo';
import { Provider } from 'react-redux';

import useCachedResources from './hooks/useCachedResources';

import { LinkingConfiguration, navigationRef } from './navigation';
import { Storage } from './services';

import {
  EntryScreen,
  GameScreen,
  ListScreen,
  PresenceScreen,
  ResponsesScreen,
  RoomsScreen,
  ScoresScreen,
  StartScreen,
} from './screens';

import configureStore from './store';


const registerForPushNotificationsAsync = async () => {
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    const token = await Notifications.getExpoPushTokenAsync();
    await Storage.save(Storage.kToken, token);
    const createdCategory = await Storage.load(Storage.kInviteCategory);
    if (!createdCategory) {
      await Notifications.createCategoryAsync('roomInvite', [
        {
          actionId: 'acceptRoomInvite',
          buttonTitle: 'Join',
          isDestructive: false,
        },
        {
          actionId: 'declineRoomInvite',
          buttonTitle: 'Decline',
          isDestructive: true,
        },
      ]);
      await Storage.save(Storage.kInviteCategory, 'true');
    }
  } else {
    alert('Must use physical device for Push Notifications');
  }
};

const RootStack = createStackNavigator();

const { store } = configureStore();

const App = () => {
  const isLoadingComplete = useCachedResources();

  React.useEffect(() => {
    if (Device.isDevice) {
      registerForPushNotificationsAsync().then(() => {
        console.log('push registration attempted');
      });
    }
  }, []);

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
          <RootStack.Screen
            name="Entry"
            component={EntryScreen}
          />
          <RootStack.Screen name="Rooms" component={RoomsScreen} />
          <RootStack.Screen name="Presence" component={PresenceScreen} />
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
