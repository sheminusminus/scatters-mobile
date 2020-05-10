import { StyleSheet } from 'react-native';

import { sizes } from '../../constants';


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
    paddingBottom: sizes.spacing.XL * 2,
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
    marginTop: sizes.spacing.XL * 2,
    marginBottom: sizes.spacing.XL,
    paddingLeft: sizes.spacing.MED,
    paddingRight: sizes.spacing.MED,
  },
  titleContainer: {
    marginBottom: sizes.spacing.XL * 2,
  },
  title: {},
  input: {
    width: '100%',
  },
  spinnerView: {
    marginTop: sizes.spacing.XL * 2,
    marginBottom: sizes.spacing.XL * 2,
  },
});


export default styles;
