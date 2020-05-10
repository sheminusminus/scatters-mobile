import { StyleSheet } from 'react-native';

import { sizes } from '../../constants';


const styles = StyleSheet.create({
  timerContainer: {
    width: '50%',
    marginTop: 60,
    height: 40,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: sizes.spacing.MED,
  },
  container: {
    width: '100%',
    height: 100,
    maxHeight: 100,
    flex: 1,
    flexDirection: 'row',
  },
  buttonsContainer: {
    width: '50%',
    marginTop: 60,
    height: 40,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: sizes.spacing.MED,
  },
  startButton: {
    marginRight: sizes.spacing.SM,
  },
});


export default styles;
