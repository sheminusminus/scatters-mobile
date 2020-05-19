import React from 'react';
import { Layout, Button, Text } from '@ui-kitten/components';

import { Intent } from '../../constants';

import styles from './styles';


const Response = (props) => {
  const {
    answers,
    username,
    index,
    onTally,
  } = props;

  const [nope, setNope] = React.useState(false);
  const [yep, setYep] = React.useState(false);

  const answer = answers[index];

  return (
    <Layout style={styles.responseContainer}>
      <Layout style={styles.answerContainer}>
        <Text
          style={answer ? styles.answer : styles.noAnswer}
        >
          {answer || '--'}
        </Text>
      </Layout>

      <Layout style={styles.infoContainer}>
        <Layout style={styles.nameContainer}>
          <Text
            category="label"
            style={styles.name}
          >
            {username}
          </Text>
        </Layout>

        <Layout style={styles.actionsContainer}>
          <Button
            appearance={nope ? 'filled' : 'outline'}
            style={styles.actionLeft}
            onPress={() => {
              setNope(true);
              setYep(false);
              onTally(index, username, -1);
            }}
            status={Intent.DANGER}
          >
            👎
          </Button>

          <Button
            appearance={yep ? 'filled' : 'outline'}
            style={styles.actionRight}
            onPress={() => {
              setYep(true);
              setNope(false);
              onTally(index, username, 1);
            }}
            status={Intent.SUCCESS}
          >
            👍
          </Button>
        </Layout>
      </Layout>

      <Layout />
    </Layout>
  );
};

export default Response;
