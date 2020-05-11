import * as React from 'react';
import PropTypes from 'prop-types';
import { Layout, List, Text } from '@ui-kitten/components';

import listItems from '../../lists';

import Response from './Response';

import styles from './styles';


class ResponsesScreen extends React.Component {
  state = {
    setIndex: 0,
    showRoundScores: false,
    talliedInSet: 0,
    tallies: this.props.players.reduce((obj, player) => ({
      ...obj,
      [player.id]: [],
    }), {}),
  };

  componentDidUpdate(prevProps, prevState) {
    const { players, onSendTallies, roundsScored } = this.props;
    const { roundsScored: prevRoundsScored } = prevProps;
    const { talliedInSet, setIndex, tallies } = this.state;
    const { talliedInSet: prevTalliedInSet } = prevState;

    if (roundsScored > prevRoundsScored) {
      this.setState({ showRoundScores: true });
    } else if (talliedInSet > prevTalliedInSet && talliedInSet === players.length) {
      if (setIndex < 11) {
        setTimeout(() => {
          this.setState({ setIndex: setIndex + 1, talliedInSet: 0 });
        }, 300);
      } else {
        setTimeout(() => {
          onSendTallies(tallies);
        }, 250);
      }
    }
  }

  handleTally = (index, playerId, vote) => {
    if (this.state.tallies[playerId][index] !== undefined) {
      const tallies = [...this.state.tallies[playerId]];
      tallies[index] = vote;
      this.setState({
        tallies: {
          ...this.state.tallies,
          [playerId]: tallies,
        },
      });
    } else {
      const tallies = [...this.state.tallies[playerId]];
      tallies.push(vote);
      this.setState({
        talliedInSet: this.state.talliedInSet + 1,
        tallies: {
          ...this.state.tallies,
          [playerId]: tallies,
        },
      });
    }
  };

  render() {
    const { setIndex } = this.state;
    const {
      currentList,
      responses,
    } = this.props;

    const items = listItems.slice(currentList * 12, (currentList + 1) * 12);

    const renderItem = ({ item }) => (
      <Response
        {...item}
        index={setIndex}
        onTally={this.handleTally}
      />
    );

    return (
      <Layout style={styles.container}>
        <Layout style={styles.questionContainer}>
          <Text category="label" style={styles.question}>
            {items[setIndex].toUpperCase()}
          </Text>
        </Layout>
        <Layout style={styles.listContainer}>
          <Layout style={styles.list}>
            {responses.length > 0 && (
              <List
                keyExtractor={(item, index) => `${item.id}-${setIndex}-${index}`}
                style={styles.listInner}
                data={responses}
                renderItem={renderItem}
              />
            )}
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

ResponsesScreen.navigationOptions = {
  header: null,
};

ResponsesScreen.propTypes = {
  onSendTallies: PropTypes.func.isRequired,
  players: PropTypes.array.isRequired,
  responses: PropTypes.array.isRequired,
  roundsScored: PropTypes.number.isRequired,
};


export default ResponsesScreen;
