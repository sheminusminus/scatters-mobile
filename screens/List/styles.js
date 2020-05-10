import { Dimensions, StyleSheet } from 'react-native';

import { sizes } from '../../constants';


const { height, width } = Dimensions.get('window');

const diceSize = 80;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 100,
    height: height - 100,
    width,
  },
});


export { diceSize };
export default styles;
