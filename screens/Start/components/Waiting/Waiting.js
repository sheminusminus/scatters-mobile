import * as React from 'react';
import { Layout, Text } from '@ui-kitten/components';

import { PopBack } from '../../../../components';

import styles from './styles';

const WaitingScreen = () => {
  return (
    <Layout style={styles.container}>
      <Text category="label" style={styles.message}>
        Waiting for others to catch up 🙃
      </Text>
      <PopBack />
    </Layout>
  );
};

WaitingScreen.navigationOptions = {
  header: null,
};

WaitingScreen.propTypes = {};

WaitingScreen.defaultProps = {};


export default WaitingScreen;
