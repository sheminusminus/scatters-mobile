import React from 'react';
import { Layout, Text } from '@ui-kitten/components';

import styles from './styles';


const Score = (props) => {
  const {
    roundIndex,
    roundScores,
    score,
    username,
  } = props;

  return (
    <Layout style={styles.scoreContainer}>
      <Layout style={styles.nameContainer}>
        <Text
          category="label"
          style={styles.name}
        >
          {`${username}: ${roundScores[roundIndex]}`}
        </Text>
      </Layout>

      <Layout style={styles.totalContainer}>
        <Text
          category="label"
          style={styles.total}
        >
          {`(Total: ${score})`}
        </Text>
      </Layout>
    </Layout>
  );
};

export default Score;
