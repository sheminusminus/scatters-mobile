import * as React from 'react';
import { Button, Icon } from '@ui-kitten/components';
import { StackActions, useNavigation } from '@react-navigation/native';

import { Intent } from '../constants';

const popAction = StackActions.popToTop();

const BackIcon = (props = {}) => (
  <Icon
    {...props}
    name="arrow-circle-left"
  />
);

const XIcon = (props = {}) => (
  <Icon
    {...props}
    name="close-circle"
  />
);

const PopBackToTop = ({ beforeBack, isCancel, style = {} }) => {
  const navigation = useNavigation();

  return (
    <Button
      accessoryLeft={isCancel ? XIcon : BackIcon}
      appearance="ghost"
      status={isCancel ? Intent.DANGER : Intent.PRIMARY}
      style={{
        position: 'absolute',
        top: 48,
        left: isCancel ? undefined : 16,
        right: isCancel ? 16 : undefined,
        width: 40,
        height: 40,
        opacity: isCancel ? 0.65 : 1,
        ...style,
      }}
      onPress={() => {
        if (beforeBack) {
          beforeBack();
        }
        navigation.dispatch(popAction);
      }}
    />
  );
};


export default PopBackToTop;
