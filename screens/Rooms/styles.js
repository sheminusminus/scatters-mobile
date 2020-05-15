import { StyleSheet } from 'react-native';

import { sizes } from '../../constants';
import { getDimensions } from '../../utils';


const styles = () => {
  const { height, width } = getDimensions();

  return StyleSheet.create({
    list: {
      minHeight: 0,
    },
    item: {
      minHeight: 50,
    },
    container: {
      paddingBottom: sizes.spacing.XL * 2,
      paddingTop: sizes.spacing.L * 2,
      minHeight: height,
      width,
    },
    titleContainer: {
      flex: 1,
      flexDirection: 'row',
      height: sizes.spacing.XL,
      maxHeight: sizes.spacing.XL,
      maxWidth: width,
      marginBottom: sizes.spacing.SM,
    },
    title: {
      width: '100%',
      textAlign: 'center',
      alignSelf: 'center',
      opacity: 0.5,
    },
    plusButton: {
      position: 'absolute',
      top: 0,
      right: sizes.spacing.MED,
      maxHeight: sizes.spacing.XL,
      maxWidth: sizes.spacing.XL,
    },
    roomsContainer: {
      paddingLeft: sizes.spacing.MED,
      paddingRight: sizes.spacing.MED,
      marginTop: sizes.spacing.L,
    },
    inputContainer: {
      marginTop: sizes.spacing.SM,
      marginBottom: sizes.spacing.SM,
    },
    checkboxContainer: {
      marginTop: sizes.spacing.SM,
      marginBottom: sizes.spacing.XL,
    },
    checkbox: {
      marginBottom: sizes.spacing.MED,
    },
    actionContainer: {
      paddingLeft: sizes.spacing.MED,
      paddingRight: sizes.spacing.MED,
      marginTop: sizes.spacing.SM,
    },
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    card: {
      padding: sizes.spacing.SM,
      width: width - (sizes.spacing.MED * 2),
    }
  });
};


export default styles;
