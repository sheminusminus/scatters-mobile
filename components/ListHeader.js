import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Text } from '@ui-kitten/components';

import { sizes } from '../constants';


const styles = {
  container: {
    minHeight: 50,
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    opacity: 0.5,
  },
};

const ListHeader = ({ children, style = {} }) => {
  return (
    <Layout style={{ ...styles.container, ...style }}>
      <Text style={styles.text} category="label">
        {children}
      </Text>
    </Layout>
  );
};

ListHeader.propTypes = {
  children: PropTypes.node,
};

ListHeader.defaultProps = {
  children: undefined,
};


export default ListHeader;
