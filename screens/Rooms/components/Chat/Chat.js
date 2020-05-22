import React from 'react';
import PropTypes from 'prop-types';
import { Keyboard, TouchableWithoutFeedback, InputAccessoryView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, Layout, Text, Icon, Input } from '@ui-kitten/components';
import { useRoute } from '@react-navigation/native';

import getStyles from './styles';


const SendIcon = (props) => (
  <Icon {...props} name="paper-plane" />
);

const Chat = (props) => {
  const {
    messages,
    // onGetMessages,
    onSendMessage,
  } = props;

  // React.useEffect(() => {
  //   onGetMessages();
  // }, []);

  const route = useRoute();

  console.log(route);

  const scroller = React.useRef(null);
  const inputAccessoryViewId = 'messageViewId';
  const [value, setValue] = React.useState('');
  const styles = getStyles();

  console.log(messages);
  const renderMessage = ({ item }) => {
    return (
      <Text category="c2">{item.text}</Text>
    );
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback
      onPress={() => {
        onSendMessage({ text: value });
        setValue('');
        Keyboard.dismiss();
      }}
    >
      <SendIcon {...props} />
    </TouchableWithoutFeedback>
  );

  return (
    <Layout style={styles.container}>
      <Layout style={styles.titleContainer}>
        <Text category="label" style={styles.title}>Messages</Text>
      </Layout>

      <KeyboardAwareScrollView
        innerRef={el => scroller.current = el}
        extraScrollHeight={12}
        keyboardOpeningTime={0}
        contentContainerStyle={styles.messagesContainer}
        keyboardDismissMode="interactive"
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
      <InputAccessoryView nativeID={inputAccessoryViewId} />
    </Layout>
  );
};

Chat.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onSendMessage: PropTypes.func.isRequired,
  // onGetMessages: PropTypes.func.isRequired,
};

export default Chat;
