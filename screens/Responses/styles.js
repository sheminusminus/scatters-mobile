import { Dimensions, StyleSheet } from 'react-native';

import { sizes } from '../../constants';


const { height, width } = Dimensions.get('window');

const diceSize = 80;

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
    position: 'relative',
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
  },
});


export { diceSize };
export default styles;
