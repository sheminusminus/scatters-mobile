import * as React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Input, Layout, Text } from '@ui-kitten/components';

import { Loading } from '../../components';

import { usePrev } from '../../hooks';

import styles from './styles';


const EntryScreen = ({ lookedForName, name, retrieveName, setName }) => {
  const [value, setValue] = React.useState(name);

  const prevName = usePrev(name);

  React.useEffect(() => {
    retrieveName();
  }, [retrieveName]);

  React.useEffect(() => {
    if (Boolean(!prevName && name)) {
      setValue(name);
    }
  }, [prevName, name]);

  console.log(lookedForName);
  return (
    <Layout style={styles.container}>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text category="h5">Scatters!</Text>
        </View>

        <Loading isShown={!lookedForName} />

        <View style={styles.inputContainer}>
          <View>
            <Input
              onChangeText={(nextValue) => setValue(nextValue)}
              placeholder="First name"
              value={value}
              style={styles.input}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            disabled={!value.length}
            onPress={() => {
              setName({ name: value });
            }}
          >
            Join the Game
          </Button>
        </View>
      </ScrollView>
    </Layout>
  );
};

EntryScreen.navigationOptions = {
  header: null,
};

EntryScreen.propTypes = {
  lookedForName: PropTypes.bool.isRequired,
  name: PropTypes.string,
  retrieveName: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
};


export default EntryScreen;
