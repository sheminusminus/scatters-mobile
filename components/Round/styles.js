import { StyleSheet } from 'react-native';

import { sizes, globalStyles } from '../../constants';


const styles = StyleSheet.create({
  container: {
    width: globalStyles.width,
    height: globalStyles.height,
    maxHeight: globalStyles.height,
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonsContainer: {
    width: globalStyles.width,
    paddingLeft: sizes.spacing.L,
    paddingRight: sizes.spacing.L,
    marginTop: 60,
    height: 40,
    maxHeight: 40,
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    width: (globalStyles.width - sizes.spacing.MED - (sizes.spacing.L * 2)) / 2,
  },
  startButton: {
    marginBottom: sizes.spacing.L,
    marginRight: sizes.spacing.MED,
  },
});


export default styles;
