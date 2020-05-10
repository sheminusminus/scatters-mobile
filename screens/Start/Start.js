import * as React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, IndexPath, Layout, Select, SelectItem, Text } from '@ui-kitten/components';

import styles from './styles';


const StartScreen = (props) => {
  const {
    currentList,
    onGetStatus,
    onSetRound,
    onStartGame,
    playerIsActive,
    players,
  } = props;

  React.useEffect(() => {
    onGetStatus();
  }, [onGetStatus]);

  const handleStart = React.useCallback(() => {
    onStartGame();
  }, [onStartGame]);

  const handleSetRound = React.useCallback((selected) => {
    if (selected !== currentList) {
      onSetRound({ round: selected });
    }
  }, [currentList, onSetRound]);

  const listItems = [];
  for (let i = 0; i < 18; i += 1) {
    listItems.push(i);
  }

  console.log('currentList', currentList);

  return (
    <Layout style={styles.container}>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text category="h5">Default Room</Text>
        </View>

        <View style={styles.listContainer}>
          {players.map((player) => (
            <Text
              category="s1"
              style={styles.listItem}
            >
              {player.username.toUpperCase()}
            </Text>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.selectContainer}>
            <Select
              selectedIndex={new IndexPath(currentList)}
              onSelect={(index) => {
                handleSetRound(index.row);
              }}
              value={`Start with list ${currentList + 1}`}
            >
              {listItems.map((item, idx) => (
                <SelectItem key={`list-${idx}`} title={`List ${idx + 1}`} />
              ))}
            </Select>
          </View>

          <Button
            disabled={!players.length}
            onPress={() => {}}
          >
            Everyone's here, let's start!
          </Button>
        </View>
      </ScrollView>
    </Layout>
  );
};

StartScreen.navigationOptions = {
  header: null,
};

StartScreen.propTypes = {
  activePlayerName: PropTypes.string,
  currentList: PropTypes.number,
  name: PropTypes.string,
  onGetStatus: PropTypes.func.isRequired,
  onSetRound: PropTypes.func.isRequired,
  onStartGame: PropTypes.func.isRequired,
  playerIsActive: PropTypes.bool.isRequired,
  players: PropTypes.array,
};

StartScreen.defaultProps = {
  activePlayerName: undefined,
  name: undefined,
  players: [],
};


export default StartScreen;
