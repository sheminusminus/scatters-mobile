import * as React from 'react';
import PropTypes from 'prop-types';
import { Button, Layout, List, Text } from '@ui-kitten/components';

import { Intent } from '../../constants';

import Score from './Score';

import styles from './styles';


const ScoresScreen = (props) => {
  const {
    onNextRound,
    playerIsActive,
    players,
    roundsScored,
  } = props;

  const renderItem = ({ item }) => (
    <Score
      {...item}
      roundIndex={roundsScored - 1}
    />
  );

  return (
    <Layout style={styles.container}>
      <Layout style={styles.questionContainer}>
        <Text category="label" style={styles.question}>
          SCORES
        </Text>
      </Layout>

      <Layout style={styles.listContainer}>
        <Layout style={styles.list}>
          <List
            keyExtractor={(item) => item.username}
            style={styles.listInner}
            data={players}
            renderItem={renderItem}
          />
        </Layout>
      </Layout>

      {playerIsActive && (
        <Layout style={styles.actionContainer}>
          <Button
            style={styles.action}
            onPress={() => onNextRound()}
            status={Intent.PRIMARY}
          >
            NEXT ROUND
          </Button>
        </Layout>
      )}
    </Layout>
  );
};

ScoresScreen.navigationOptions = {
  header: null,
};

ScoresScreen.propTypes = {
  onNextRound: PropTypes.func.isRequired,
  playerIsActive: PropTypes.bool.isRequired,
  players: PropTypes.array.isRequired,
  roundsScored: PropTypes.number.isRequired,
};


export default ScoresScreen;
