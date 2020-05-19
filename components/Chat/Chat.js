import React from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback, InputAccessoryView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, Layout, Text, Icon, Input } from '@ui-kitten/components';

import getStyles from './styles';


const SendIcon = (props) => (
  <Icon {...props} name="paper-plane" />
);

const Chat = (props) => {
  const {
    messages,
    onSendMessage,
  } = props;

  const inputAccessoryViewId = 'messageViewId';
  const [value, setValue] = React.useState('');
  const styles = getStyles();

  const renderMessage = ({ item }) => {
    return (
      <Text category="c2">{item.text}</Text>
    );
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={onSendMessage}>
      <SendIcon {...props} />
    </TouchableWithoutFeedback>
  );

  return (
    <Layout style={styles.container}>
      <Layout style={styles.titleContainer}>
        <Text category="label" style={styles.title}>Messages</Text>
      </Layout>

      <KeyboardAwareScrollView
        extraScrollHeight={12}
        keyboardOpeningTime={0}
        contentContainerStyle={styles.messagesContainer}
      >
        <Input
          value={value}
          placeholder='Type a message'
          accessoryRight={renderIcon}
          onChangeText={nextValue => setValue(nextValue)}
          style={styles.inputField}
          inputAccessoryViewID={inputAccessoryViewId}
        />
      </KeyboardAwareScrollView>
      <InputAccessoryView nativeID={inputAccessoryViewId}>
        <Button
          accessoryLeft={renderIcon}
        />
      </InputAccessoryView>
    </Layout>
  );
};

Chat.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onSendMessage: PropTypes.func.isRequired,
};

export default Chat;
