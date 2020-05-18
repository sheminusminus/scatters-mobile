import * as React from 'react';
import { Button, Icon } from '@ui-kitten/components';
import { StackActions, useNavigation } from '@react-navigation/native';

import { Intent } from '../constants';

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

const ReplaceTo = ({ beforeReplace, isCancel, style = {}, to }) => {
  const navigation = useNavigation();

  const replaceAction = StackActions.replace(to);

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
        if (beforeReplace) {
          beforeReplace();
        }
        navigation.dispatch(replaceAction);
      }}
    />
  );
};


export default ReplaceTo;
