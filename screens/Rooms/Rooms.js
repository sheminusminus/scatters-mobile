import * as React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Button, Icon, Layout, Text } from '@ui-kitten/components';

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
  const {
    allRooms,
    joinedRooms,
    onRequestRoom,
    onRequestListRooms,
    navigation,
  } = props;

  const styles = makeStyles();

  const [selected, setSelected] = React.useState(null);
  const [input, setInput] = React.useState(null);

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
    if (!selected) {
      navigation.navigate('Create');
    } else {
      onRequestRoom(selected);
    }
  };

  useFocusEffect(React.useCallback(() => {
    onRequestListRooms();
  }, [onRequestListRooms]));

  return (
    <Layout style={styles.container}>
      <Layout style={styles.titleContainer}>
        <Text category="label" style={styles.title}>
          JOIN A ROOM
        </Text>
        <Button
          disabled={!selected}
          onPress={() => {
            navigation.navigate('Presence', { room: selected });
          }}
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
          accessoryLeft={selected ? undefined : AddIcon}
          accessoryRight={selected ? GoIcon : undefined}
          onPress={handlePress}
        >
          {!!selected && `Join "${selected}"`}
          {!selected && !input && 'Create New Room'}
        </Button>
      </View>
    </Layout>
  );
};

RoomsScreen.navigationOptions = {
  header: null,
};

RoomsScreen.propTypes = {
  onRequestRoom: PropTypes.func.isRequired,
  onRequestListRooms: PropTypes.func.isRequired,
  allRooms: PropTypes.array,
  joinedRooms: PropTypes.array,
  username: PropTypes.string,
  onEmitName: PropTypes.func.isRequired,
};

RoomsScreen.defaultProps = {
  allRooms: null,
  joinedRooms: null,
};


export default RoomsScreen;
