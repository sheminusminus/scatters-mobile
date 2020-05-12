import * as React from 'react';
import PropTypes from 'prop-types';
import { View, KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Input, Layout, Text } from '@ui-kitten/components';

import { Loading } from '../../components';

import { usePrev } from '../../hooks';

import styles from './styles';


const EntryScreen = ({ onCheckRecordingPerms, lookedForName, username, navigation, onRetrieveName, onEmitName, rooms }) => {
  const [value, setValue] = React.useState(username);

  React.useEffect(() => {
    onRetrieveName();
    onCheckRecordingPerms();
  }, [onRetrieveName, onCheckRecordingPerms]);

  const prevName = usePrev(username);
  const prevRooms = usePrev(rooms);

  React.useEffect(() => {
    if (Boolean(!prevName && username)) {
      setValue(username);
    }
  }, [prevName, username]);

  React.useEffect(() => {
    if (Boolean(!prevRooms && rooms)) {
      navigation.navigate('Rooms');
    }
  }, [prevName, username]);

  console.log(prevRooms, rooms);
  return (
    <Layout style={styles.container}>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text category="h5">Scatters!</Text>
        </View>

        <Loading isShown={!lookedForName} />

        <View style={styles.inputContainer}>
          <View>
            <Input
              onChangeText={(nextValue) => setValue(nextValue)}
              placeholder="First name"
              value={value}
              style={styles.input}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            disabled={!value.length}
            onPress={() => {
              onEmitName({ username: value });
            }}
          >
            Join the Game
          </Button>
        </View>
      </ScrollView>
    </Layout>
  );
};

EntryScreen.navigationOptions = {
  header: null,
};

EntryScreen.propTypes = {
  lookedForName: PropTypes.bool.isRequired,
  username: PropTypes.string,
  navigation: PropTypes.shape().isRequired,
  onCheckRecordingPerms: PropTypes.func.isRequired,
  onRetrieveName: PropTypes.func.isRequired,
  onEmitName: PropTypes.func.isRequired,
  rooms: PropTypes.array,
};

EntryScreen.defaultProps = {
  rooms: null,
};


export default EntryScreen;
