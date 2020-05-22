import React from 'react';
import PropTypes from 'prop-types';
import { Keyboard, TouchableOpacity, InputAccessoryView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, Layout, Text, Icon, Input, Divider, List } from '@ui-kitten/components';

import { usePrev } from '../../hooks';

import KeyboardAvoidingView from '../KeyboardAvoidingView';

import getStyles from './styles';


const SendIcon = (props) => (
  <Icon {...props} name="paper-plane" />
);

const keyboardOffset = (height) => height;

const Chat = (props) => {
  const {
    messages,
    // onGetMessages,
    onSendMessage,
    room,
  } = props;

  // React.useEffect(() => {
  //   onGetMessages();
  // }, []);

  const listRef = React.useRef(null);
  const inputAccessoryViewId = 'messageViewId';
  const [value, setValue] = React.useState('');
  const styles = getStyles();

  const prevMessages = usePrev(messages) || [];

  React.useEffect(() => {
    if (messages.length !== prevMessages.length) {
      setTimeout(() => {
        if (listRef && listRef.current) {
          listRef.current.scrollToEnd({ animated: true });
        }
      }, 200);
    }
  }, [messages, prevMessages]);
  console.log(messages);

  const renderMessage = ({ item }) => {
    return (
      <Layout style={styles.messageItem}>
        <Text category="c2" style={styles.messageItemName}>{item.username}</Text>
        <Text category="c2" style={styles.messageItemText}>{item.text}</Text>
      </Layout>
    );
  };

  return (
    <Layout style={styles.container} level="2">
      <List
        ref={listRef}
        data={messages}
        renderItem={renderMessage}
      />
      <KeyboardAvoidingView
        style={styles.messageInputContainer}
        offset={keyboardOffset}>
        <Input
          style={styles.messageInput}
          placeholder='Message...'
          value={value}
          onChangeText={setValue}
        />
        <Button
          appearance='ghost'
          style={[styles.iconButton, styles.sendButton]}
          accessoryLeft={SendIcon}
          onPress={() => {
            onSendMessage({ text: value, room });
            setValue('');
            Keyboard.dismiss();
          }}
        />
      </KeyboardAvoidingView>
    </Layout>
  );
};

Chat.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onSendMessage: PropTypes.func.isRequired,
  room: PropTypes.string.isRequired,
  // onGetMessages: PropTypes.func.isRequired,
};

export default Chat;
