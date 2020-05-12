import * as React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Button, Card, Icon, Input, Modal, Layout, Text } from '@ui-kitten/components';

import { ListHeader, RoomsMenu } from '../../components';
import { Intent } from '../../constants';

import makeStyles from './styles';


const PlusIcon = (props = {}) => (
  <Icon {...props} name="person-add" />
);

const AddIcon = (props = {}) => (
  <Icon {...props} name="plus" />
);

const GoIcon = (props = {}) => (
  <Icon {...props} name="arrow-forward" />
);

const RoomsScreen = (props) => {
  const { allRooms, joinedRooms, onRequestRoom } = props;

  const styles = makeStyles();

  const [selected, setSelected] = React.useState(null);
  const [input, setInput] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);

  const joinedItems = joinedRooms || [];
  const allItems = allRooms || [];

  const renderJoinedListHeader = () => (
    <ListHeader>
      {`My Rooms${joinedItems.length === 0 ? ' (none joined yet)' : ''}`}
    </ListHeader>
  );

  const renderAllListHeader = () => (
    <ListHeader>
      {`All Rooms${allItems.length === 0 ? ' (none here, create one!)' : ''}`}
    </ListHeader>
  );

  const joinedHeight = Math.min((joinedItems.length * 50) + 50, 300);
  const allHeight = Math.min((allItems.length * 50) + 50, 300);

  const handlePress = () => {
    if (!selected && !input) {
      setModalVisible(true);
    } else if (selected) {
      onRequestRoom(selected);
      setModalVisible(false);
    } else {
      onRequestRoom(input);
      setModalVisible(false);
    }
  };

  return (
    <Layout style={styles.container}>
      <Layout style={styles.titleContainer}>
        <Text category="h5" style={styles.title}>
          Join a Room
        </Text>
        <Button
          disabled
          appearance="ghost"
          accessoryLeft={PlusIcon}
          style={styles.plusButton}
          status={Intent.SUCCESS}
        />
      </Layout>

      <Layout style={{ paddingHorizontal: 24 }}>
        <RoomsMenu
          ListHeaderComponent={renderJoinedListHeader}
          items={joinedItems}
          keyExtractor={item => item}
          selected={selected}
          setSelected={(val) => {
            setSelected(val);
            setInput('');
          }}
          itemStyle={styles.item}
          style={{
            height: joinedHeight,
            maxHeight: joinedHeight,
          }}
        />
      </Layout>

      <Layout style={{ paddingHorizontal: 24 }}>
        <RoomsMenu
          ListHeaderComponent={renderAllListHeader}
          items={allItems}
          keyExtractor={item => item}
          selected={selected}
          setSelected={(val) => {
            setSelected(val);
            setInput('');
          }}
          style={{
            height: allHeight,
            maxHeight: allHeight,
            marginBottom: 40,
          }}
        />
      </Layout>

      <View style={styles.actionContainer}>
        <Button
          accessoryRight={selected ? GoIcon : AddIcon}
          onPress={handlePress}
        >
          {!!selected && `Join "${selected}"`}
          {!selected && !input && 'Create New Room'}
        </Button>
      </View>

      <Modal
        visible={modalVisible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setModalVisible(false)}>
        <Card disabled={true} style={styles.card}>
          <Text category="label" style={{ opacity: 0.8 }}>NEW ROOM NAME</Text>

          <View style={styles.inputContainer}>
            <Input
              value={input}
              onChangeText={(val) => {
                setSelected(null);
                setInput(val);
              }}
              status={input && input.length >= 1 ? Intent.SUCCESS : undefined}
              placeholder="e.g. My Secret Room"
            />
          </View>

          <Button onPress={handlePress}>
            Done
          </Button>
        </Card>
      </Modal>
    </Layout>
  );
};

RoomsScreen.navigationOptions = {
  header: null,
};

RoomsScreen.propTypes = {
  onRequestRoom: PropTypes.func.isRequired,
  allRooms: PropTypes.array,
  joinedRooms: PropTypes.array,
};

RoomsScreen.defaultProps = {
  allRooms: null,
  joinedRooms: null,
};


export default RoomsScreen;
