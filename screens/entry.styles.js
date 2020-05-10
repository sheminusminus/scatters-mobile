import { StyleSheet } from 'react-native';

import { sizes } from '../constants';


const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    paddingLeft: sizes.spacing.MED,
    paddingRight: sizes.spacing.MED,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: sizes.spacing.XL,
    paddingLeft: sizes.spacing.MED,
    paddingRight: sizes.spacing.MED,
  },
  titleContainer: {
    height: sizes.spacing.XL * 4,
    marginBottom: sizes.spacing.XL,
  },
  title: {},
  input: {
    width: '100%',
  },
});


export default styles;
