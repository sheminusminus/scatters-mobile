import * as React from 'react';
import PropTypes from 'prop-types';
import { Keyboard, View } from 'react-native';
import { Button, Card, CheckBox, Icon, Input, Modal, Layout, Text } from '@ui-kitten/components';

import { ListHeader, RoomsMenu, PopBack, KeyboardDismissingView } from '../../../../components';
import { Intent } from '../../../../constants';

import makeStyles from './styles';


const styles = makeStyles();

const AddIcon = (props = {}) => (
  <Icon {...props} name="plus" />
);

const GoIcon = (props = {}) => (
  <Icon {...props} name="arrow-forward" />
);

const Header = (props) => (
  <View {...props}>
    <Text category="label" style={styles.title}>
      CREATE A ROOM
    </Text>
  </View>
);

const Footer = ({ onNvm, onDone, style, ...rest }) => (
  <View {...rest} style={[style, styles.footerContainer]}>
    <Button
      style={styles.footerButtonLeft}
      size='small'
      status='basic'
      onPress={onNvm}
    >
      NVM
    </Button>
    <Button
      style={styles.footerButton}
      size='small'
      onPress={onDone}
    >
      DONE
    </Button>
  </View>
);

const CreateScreen = (props) => {
  const {
    // setSelected,
    navigation,
    onDone,
  } = props;

  const [input, setInput] = React.useState(null);
  // const [kbOpen, setKbOpen] = React.useState(false);
  const [isRealtime, setIsRealtime] = React.useState(true);
  const [isPrivate, setIsPrivate] = React.useState(false);

  // const _keyboardDidShow = React.useCallback(() => { setKbOpen(true); }, []);
  //
  // const _keyboardDidHide = React.useCallback(() => { setKbOpen(false); }, []);
  //
  // React.useEffect(() => {
  //   Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
  //   Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
  //
  //   return () => {
  //     Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
  //     Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
  //   };
  // }, []);

  return (
    <KeyboardDismissingView>
      <Layout style={styles.titleContainer}>
        <Text category="label" style={styles.title}>SHINY NEW ROOM</Text>
      </Layout>

      <View style={styles.inputContainer}>
        <Input
          value={input || ''}
          onChangeText={(val) => {
            setInput(val);
          }}
          status={input && input.length >= 1 ? Intent.SUCCESS : undefined}
          placeholder="e.g. My Secret Room"
        />
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox
          checked={isRealtime}
          onChange={(value) => setIsRealtime(value)}
          status={Intent.INFO}
          style={styles.checkbox}
        >
          Only for realtime games
        </CheckBox>
        <CheckBox
          checked={isPrivate}
          onChange={(value) => setIsPrivate(value)}
          status={Intent.INFO}
        >
          Only people I invite can join
        </CheckBox>
      </View>

      <View style={styles.footerContainer}>
        <Button
          appearance="outline"
          style={styles.footerButtonLeft}
          size='small'
          status={Intent.DANGER}
          onPress={() => {
            navigation.navigate('Rooms');
          }}
        >
          NVM
        </Button>
        <Button
          appearance="outline"
          style={styles.footerButton}
          size='small'
          onPress={() => {
            const payload = {
              room: input,
              isRealtime,
              isPrivate,
            };
            onDone(payload);
          }}
          status={Intent.SUCCESS}
        >
          DONE
        </Button>
      </View>

      <PopBack isCancel style={{ top: 60 }} />
    </KeyboardDismissingView>
  );
};

CreateScreen.navigationOptions = {
  header: null,
};

CreateScreen.propTypes = {
  navigation: PropTypes.shape().isRequired,
  onDone: PropTypes.func.isRequired,
};


export default CreateScreen;
