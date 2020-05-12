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

const PopBack = ({ style = {} }) => {
  const navigation = useNavigation();

  return (
    <Button
      accessoryLeft={BackIcon}
      appearance="ghost"
      status={Intent.PRIMARY}
      style={{
        position: 'absolute',
        top: 48,
        left: 16,
        width: 40,
        height: 40,
        ...style,
      }}
      onPress={() => {
        navigation.dispatch(popAction);
      }}
    />
  );
};


export default PopBack;
