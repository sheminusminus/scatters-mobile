import { StyleSheet } from 'react-native';

import { globalStyles } from '../../constants';


const diceSize = 80;

const styles = StyleSheet.create({
  messageContainer: {
    ...globalStyles.titleContainer,
  },
  message: {
    ...globalStyles.title,
    width: '100%',
    textAlign: 'center',
  },
  container: {
    ...globalStyles.container,
    flex: 1,
    justifyContent: 'space-between',
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
    zIndex: 2000,
  },
});


export { diceSize };
export default styles;
