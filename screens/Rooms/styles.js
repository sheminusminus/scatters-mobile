import { StyleSheet, Dimensions } from 'react-native';

import { sizes } from '../../constants';


const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: sizes.spacing.XL * 2,
    paddingTop: 100,
  },
  titleContainer: {
    position: 'absolute',
    top: 0,
    height: 100,
    paddingTop: 60,
    width,
    marginBottom: sizes.spacing.XL * 2,
    paddingLeft: sizes.spacing.SM,
    paddingRight: sizes.spacing.SM,
  },
  title: {
    width: '100%',
    textAlign: 'center',
  },
  item: {
    height: 40,
  },
  itemLayout: {
    height: 40,
    flex: 1,
    justifyContent: 'center',
    paddingLeft: sizes.spacing.SM,
    paddingRight: sizes.spacing.SM,
  },
  itemText: {
  },
  itemTextSelected: {
    color: 'rgb(0, 224, 150)',
  },
  roomsContainer: {
    maxHeight: 300,
    paddingLeft: sizes.spacing.SM,
    paddingRight: sizes.spacing.SM,
    paddingTop: sizes.spacing.SM,
  },
  inputContainer: {
    height: 100,
    paddingLeft: sizes.spacing.SM,
    paddingRight: sizes.spacing.SM,
    paddingTop: sizes.spacing.XL,
  },
  actionContainer: {
    height: 100,
    paddingLeft: sizes.spacing.SM,
    paddingRight: sizes.spacing.SM,
    paddingTop: sizes.spacing.MED,
  },
});


export default styles;
