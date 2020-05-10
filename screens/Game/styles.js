import { Dimensions, StyleSheet } from 'react-native';

import { sizes } from '../../constants';


const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  messageContainer: {
    height: 100,
    width,
  },
  message: {
    width: '100%',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    height,
    width,
  },
  scrollContainer: {
    flex: 1,
    width,
    height,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  diceContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});


export default styles;
