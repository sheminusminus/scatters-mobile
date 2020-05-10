import * as React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Layout, Spinner } from '@ui-kitten/components';

import { Intent } from '../constants';


const Loading = ({ intent, isAnimating, isShown, styles }) => (
  isShown ? (
    <Layout styles={styles}>
      <Spinner
        animating={isAnimating}
        status={intent}
      />
    </Layout>
  ) : null
);

Loading.propTypes = {
  intent: PropTypes.string,
  isAnimating: PropTypes.bool,
  isShown: PropTypes.bool,
};

Loading.defaultProps = {
  intent: Intent.PRIMARY,
  isAnimating: true,
  isShown: true,
};


export default Loading;
