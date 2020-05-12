import * as React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { Button, Input, Layout, Text, List } from '@ui-kitten/components';

import styles from './styles';


const RoomsScreen = (props) => {
  const { defaultRoomAvailable, onRequestRoom, rooms } = props;

  const [selected, setSelected] = React.useState(null);
  const [input, setInput] = React.useState('');

  console.log(props);
  // const roomItems = Object.values(rooms || {}).filter((roomId) => roomId !== playerId);
  const roomItems = Object.values(rooms || {});

  if (defaultRoomAvailable) {
    roomItems.push('default');
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        if (item === selected) {
          setSelected(null);
        } else {
          setInput('');
          setSelected(item);
        }
      }}
      style={styles.item}
    >
      <Layout style={styles.itemLayout} level={item === selected ? '2' : '1'}>
        <Text style={item === selected ? styles.itemTextSelected : styles.itemText}>
          {item}
        </Text>
      </Layout>
    </TouchableOpacity>
  );

  return (
    <Layout style={styles.container}>
      <View style={styles.titleContainer}>
        <Text category="h5" style={styles.title}>
          Rooms
        </Text>
      </View>

      <View style={styles.roomsContainer}>
        {roomItems.length > 0 && (
          <List
            data={roomItems}
            keyExtractor={(item) => item}
            renderItem={renderItem}
          />
        )}
        {roomItems.length === 0 && (
          <Layout>
            <Text>
              You haven't joined any rooms
            </Text>
          </Layout>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Input
          value={input}
          onChangeText={(val) => {
            setSelected(null);
            setInput(val);
          }}
          placeholder="Room name (find or create)"
        />
      </View>

      <View style={styles.actionContainer}>
        <Button
          disabled={!selected && !input}
          onPress={() => {
            if (selected) {
              onRequestRoom(selected);
            } else if (input) {
              onRequestRoom(input);
            }
          }}
        >
          {!!selected && `Join "${selected}"`}

          {!!input && `Join or create "${input}"`}
        </Button>
      </View>
    </Layout>
  );
};

RoomsScreen.navigationOptions = {
  header: null,
};

RoomsScreen.propTypes = {
  defaultRoomAvailable: PropTypes.bool.isRequired,
  onRequestRoom: PropTypes.func.isRequired,
  rooms: PropTypes.shape().isRequired,
};


export default RoomsScreen;
