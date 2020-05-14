import { Dimensions, StyleSheet } from 'react-native';

import { sizes } from '../../constants';


const { height, width } = Dimensions.get('window');

const diceSize = 80;

const styles = StyleSheet.create({
  messageContainer: {
    maxHeight: 100,
    width,
    top: 100,
    position: 'absolute',
    zIndex: 1900,
  },
  message: {
    width: '100%',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    height,
    maxHeight: height,
    width,
  },
  diceContainer: {
    position: 'absolute',
    height: diceSize,
    width: diceSize,
    flex: 1,
    justifyContent: 'center',
  },
  dice: {
    flex: 1,
    justifyContent: 'center',
    width: diceSize,
    height: diceSize,
    zIndex: 2000,
  },
});


export { diceSize };
export default styles;
