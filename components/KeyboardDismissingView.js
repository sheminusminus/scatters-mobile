import * as React from 'react';
import PropTypes from 'prop-types';
import { Keyboard } from 'react-native';
import { Layout } from '@ui-kitten/components';

import { sizes } from '../constants';
import { getDimensions } from '../utils';



const { height, width } = getDimensions();

const styles = {
  container: {
    paddingBottom: sizes.spacing.XL * 2,
    paddingTop: sizes.spacing.L * 2,
    minHeight: height,
    width,
  },
};


const KeyboardDismissingView = (props) => {
  const {
    children,
    onHide,
    onShow,
    style,
  } = props;

  const [kbOpen, setKbOpen] = React.useState(false);

  const _keyboardDidShow = React.useCallback((evt) => {
    setKbOpen(true);
    if (onShow) {
      onShow(evt);
    }
  }, [onShow]);
  const _keyboardDidHide = React.useCallback((evt) => {
    setKbOpen(false);
    if (onHide) {
      onHide(evt);
    }
  }, [onHide]);

  React.useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  return (
    <Layout
      style={style || styles.container}
      onStartShouldSetResponder={() => true}
      onResponderGrant={() => {
        if (kbOpen) { Keyboard.dismiss(); }
      }}
    >
      {children}
    </Layout>
  );
};

KeyboardDismissingView.propTypes = {
  children: PropTypes.any,
  onHide: PropTypes.func,
  onShow: PropTypes.func,
};


export default KeyboardDismissingView;
