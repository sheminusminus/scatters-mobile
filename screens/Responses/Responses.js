import * as React from 'react';
import PropTypes from 'prop-types';
import { Animated, Dimensions, Easing, TouchableOpacity } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

import { Dice, Round } from '../../components';

import listItems from '../../lists';

import styles, { diceSize } from './styles';


const { height, width } = Dimensions.get('window');

const midX = (width * 0.5) - (diceSize * 0.5);
const midY = (height * 0.5) - (diceSize * 0.5);

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
    const { isOpen, players, onSendTallies, roundsScored } = this.props;
    const { isOpen: wasOpen, roundsScored: prevRoundsScored } = prevProps;
    const { talliedInSet, setIndex, tallies } = this.state;
    const { talliedInSet: prevTalliedInSet } = prevState;

    if (wasOpen && !isOpen) {
      this.setState({
        setIndex: 0,
        showRoundScores: false,
        talliedInSet: false,
      });
    } else if (roundsScored > prevRoundsScored) {
      this.setState({ showRoundScores: true });
    } else if (talliedInSet > prevTalliedInSet && talliedInSet === players.length) {
      if (setIndex < 11) {
        setTimeout(() => {
          this.setState({ setIndex: setIndex + 1, talliedInSet: 0 });
        }, 250);
      } else {
        setTimeout(() => {
          onSendTallies(tallies);
        }, 250);
      }
    } else if (!wasOpen && isOpen) {
      this.setState({
        tallies: players.reduce((obj, player) => ({
          ...obj,
          [player.id]: [],
        }), {}),
      });
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
    const { setIndex, showRoundScores } = this.state;
    const {
      activePlayer,
      currentList,
      isOpen,
      onNextRound,
      playerId,
      players,
      responses,
      roundsScored,
    } = this.props;

    if (!isOpen) {
      return null;
    }

    const items = listItems.slice(currentList * 12, (currentList + 1) * 12);

    return <Layout />;
    // return (
    //   <div className="modal">
    //     <Route
    //       path="/responses/scores"
    //       render={() => (
    //         <div>
    //           <p className="scoresHeader">Round scores:</p>
    //
    //           {players.map((p) => (
    //             <Score
    //               {...p}
    //               key={p.id}
    //               roundIndex={roundsScored - 1}
    //             />
    //           ))}
    //
    //           {playerId === activePlayer && (
    //             <button
    //               className="gameBtn"
    //               onClick={() => onNextRound()}
    //               type="button"
    //             >
    //               Next round
    //             </button>
    //           )}
    //         </div>
    //       )}
    //     />
    //     <Route
    //       exact
    //       path="/responses"
    //       render={() => (
    //         <div>
    //           <p className="scoresHeader">{items[setIndex]}</p>
    //
    //           {responses.map((resp) => (
    //             <Response
    //               {...resp}
    //               key={`${resp.id}-${setIndex}`}
    //               onTally={this.handleTally}
    //               index={setIndex}
    //             />
    //           ))}
    //         </div>
    //       )}
    //     />
    //   </div>
    // );
  }
}

ResponsesScreen.navigationOptions = {
  header: null,
};

ResponsesScreen.propTypes = {
  activePlayer: PropTypes.string.isRequired,
  currentPlayer: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onSendTallies: PropTypes.func.isRequired,
  onNextRound: PropTypes.func.isRequired,
  playerId: PropTypes.string.isRequired,
  players: PropTypes.array.isRequired,
  responses: PropTypes.array.isRequired,
  roundsScored: PropTypes.number.isRequired,
};

ResponsesScreen.defaultProps = {
  roll: null,
  playerIsActive: false,
};


export default ResponsesScreen;
