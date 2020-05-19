import * as React from 'react';
import { Button, Icon } from '@ui-kitten/components';
import { StackActions, useNavigation } from '@react-navigation/native';

import { Intent } from '../constants';

const popAction = StackActions.pop(1);

const BackIcon = (props = {}) => (
  <Icon
    {...props}
    name="arrow-circle-left"
  />
);

// const XIcon = (props = {}) => (
//   <Icon
//     {...props}
//     name="log-out"
//   />
// );

const XIcon = (props = {}) => (
  <Icon
    {...props}
    name="backspace"
  />
);

const PopBack = ({ beforeBack, isCancel, shouldNavigate = true, style = {} }) => {
  const navigation = shouldNavigate ? useNavigation() : undefined;

  return (
    <Button
      accessoryLeft={isCancel ? XIcon : BackIcon}
      appearance="ghost"
      status={isCancel ? Intent.DANGER : Intent.PRIMARY}
      style={{
        position: 'absolute',
        top: 40,
        left: 16,
        width: 40,
        height: 40,
        opacity: isCancel ? 0.65 : 1,
        ...style,
      }}
      onPress={() => {
        if (beforeBack) {
          beforeBack();
        }
        if (shouldNavigate) {
          navigation.dispatch(popAction);
        }
      }}
    />
  );
};


export default PopBack;
