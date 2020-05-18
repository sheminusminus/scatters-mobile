import * as React from 'react';
import { Layout, Text } from '@ui-kitten/components';

import styles from './styles';

const WaitingScreen = () => {
  return (
    <Layout style={styles.container}>
      <Text category="label" style={styles.message}>
        Waiting for others to catch up 🙃
      </Text>
    </Layout>
  );
};

WaitingScreen.navigationOptions = {
  header: null,
};

WaitingScreen.propTypes = {};

WaitingScreen.defaultProps = {};


export default WaitingScreen;
