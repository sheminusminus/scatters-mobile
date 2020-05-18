import { Dimensions, StyleSheet } from 'react-native';


const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  message: {
    width: '100%',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height,
    maxHeight: height,
    width,
  },
});


export default styles;
