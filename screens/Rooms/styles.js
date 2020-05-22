import { StyleSheet } from 'react-native';

import { sizes, globalStyles } from '../../constants';
import { getDimensions } from '../../utils';


const getStyles = () => {
  const { width } = getDimensions();

  return StyleSheet.create({
    list: {
      minHeight: 0,
    },
    item: {
      minHeight: 50,
    },
    container: {
      ...globalStyles.container,
    },
    titleContainer: {
      ...globalStyles.titleContainer,
    },
    title: {
      ...globalStyles.title,
      paddingTop: sizes.spacing.XS,
    },
    chatButton: {
      position: 'absolute',
      top: 0,
      left: sizes.spacing.MED,
      maxHeight: sizes.spacing.XL,
      maxWidth: sizes.spacing.XL,
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


export default getStyles;
