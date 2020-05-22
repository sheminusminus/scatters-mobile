import * as React from 'react';
import PropTypes from 'prop-types';
import { Keyboard, View } from 'react-native';
import { Button, CheckBox, Input, Layout, Text } from '@ui-kitten/components';
import { useFocusEffect, StackActions } from '@react-navigation/native';

import { PopBack, KeyboardDismissingView } from '../../../../components';
import { Intent } from '../../../../constants';

import makeStyles from './styles';


const pop = StackActions.pop(1);

const styles = makeStyles();

const CreateScreen = (props) => {
  const { navigation, onDone } = props;

  const [input, setInput] = React.useState(null);
  const [isRealtime, setIsRealtime] = React.useState(true);
  const [isPrivate, setIsPrivate] = React.useState(false);

  return (
    <KeyboardDismissingView style={styles.container}>
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

      {/*<View style={styles.checkboxContainer}>*/}
      {/*  <CheckBox*/}
      {/*    disabled*/}
      {/*    checked={isRealtime}*/}
      {/*    onChange={(value) => setIsRealtime(value)}*/}
      {/*    status={Intent.INFO}*/}
      {/*    style={styles.checkbox}*/}
      {/*  >*/}
      {/*    Realtime*/}
      {/*  </CheckBox>*/}
      {/*  <CheckBox*/}
      {/*    disabled*/}
      {/*    checked={isPrivate}*/}
      {/*    onChange={(value) => setIsPrivate(value)}*/}
      {/*    status={Intent.INFO}*/}
      {/*    style={styles.checkboxUnder}*/}
      {/*  >*/}
      {/*    Invite-only*/}
      {/*  </CheckBox>*/}
      {/*</View>*/}

      <View style={styles.footerContainer}>
        {/*<Button*/}
        {/*  appearance="outline"*/}
        {/*  style={styles.footerButtonLeft}*/}
        {/*  size='small'*/}
        {/*  status={Intent.DANGER}*/}
        {/*  onPress={() => {*/}
        {/*    Keyboard.dismiss();*/}
        {/*    navigation.navigate('Rooms');*/}
        {/*  }}*/}
        {/*>*/}
        {/*  NVM*/}
        {/*</Button>*/}
        <Button
          disabled={!input}
          style={styles.footerButton}
          size='small'
          onPress={() => {
            Keyboard.dismiss();
            const payload = {
              room: input,
              isRealtime,
              isPrivate,
            };
            navigation.dispatch(pop);
            setTimeout(() => {
              onDone(payload);
            }, 600);
          }}
          status={Intent.PRIMARY}
        >
          LOOKS GOOD
        </Button>
      </View>

      <PopBack isCancel style={{ top: 40 }} />
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
