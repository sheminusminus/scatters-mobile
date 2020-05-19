import { StyleSheet } from 'react-native';

import { sizes, globalStyles } from '../../constants';


const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    paddingLeft: sizes.spacing.MED,
    paddingRight: sizes.spacing.MED,
  },
  container: {
    ...globalStyles.container,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: globalStyles.height,
    paddingTop: 0,
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
  listContainer: {
    width: '100%',
    marginTop: sizes.spacing.XL * 2,
    marginBottom: sizes.spacing.XL * 2,
    paddingLeft: sizes.spacing.MED,
    paddingRight: sizes.spacing.MED,
  },
  listItem: {
    marginBottom: sizes.spacing.XS,
    textAlign: 'center',
  },
  titleContainer: {
    ...globalStyles.titleContainer,
    top: globalStyles.titleContainer.height * 1.5,
    position: 'absolute',
    opacity: 0.7,
    marginBottom: 0,
  },
  title: {
    ...globalStyles.title,
    paddingBottom: sizes.spacing.L,
  },
  selectContainer: {
    marginBottom: sizes.spacing.XL + sizes.spacing.SM,
  },
});


export default styles;
