import * as React from 'react';
import PropTypes from 'prop-types';
import { Keyboard, View } from 'react-native';
import { Button, CheckBox, Input, Layout, Text } from '@ui-kitten/components';

import { PopBack, KeyboardDismissingView } from '../../../../components';
import { Intent } from '../../../../constants';

import makeStyles from './styles';


const styles = makeStyles();

const CreateScreen = (props) => {
  const {
    navigation,
    onDone,
  } = props;

  const [input, setInput] = React.useState(null);
  const [isRealtime, setIsRealtime] = React.useState(true);
  const [isPrivate, setIsPrivate] = React.useState(false);

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
            Keyboard.dismiss();
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
            Keyboard.dismiss();
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
