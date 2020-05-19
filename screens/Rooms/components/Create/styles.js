import { StyleSheet } from 'react-native';

import { sizes, globalStyles } from '../../../../constants';
import { getDimensions } from '../../../../utils';


const { width } = getDimensions();

const realEstate = '40%';

const footerButton = {
  // width: realEstate,te
  //   // minWidth: realEsta,
  width: width - (sizes.spacing.MED * 2),
  maxWidth: width - (sizes.spacing.MED * 2),
  height: 42,
};

const styles = () => {
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
      flex: 1,
      justifyContent: 'center',
    },
    title: {
      ...globalStyles.title,
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
      marginTop: sizes.spacing.XL,
      marginBottom: sizes.spacing.SM,
      marginHorizontal: 0,
      paddingHorizontal: sizes.spacing.L,
    },
    checkboxContainer: {
      marginTop: sizes.spacing.MED,
      marginBottom: sizes.spacing.XL + sizes.spacing.MED,
      paddingHorizontal: sizes.spacing.L,
    },
    checkbox: {
      marginBottom: sizes.spacing.MED,
      marginLeft: sizes.spacing.XS,
    },
    checkboxUnder: {
      marginLeft: sizes.spacing.XS,
    },
    actionContainer: {
      marginTop: sizes.spacing.MED,
      paddingLeft: sizes.spacing.MED,
      paddingRight: sizes.spacing.MED,
      flex: 1,
      flexDirection: 'row',
      maxHeight: 40,
      justifyContent: 'space-between',
    },
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      minWidth: '50%',
    },
    card: {
      paddingTop: sizes.spacing.SM,
      paddingBottom: sizes.spacing.SM,
      paddingHorizontal: 0,
      marginHorizontal: 0,
      backgroundColor: 'green',
      width: width - (sizes.spacing.MED * 2),
    },
    actionButton: {
      width: realEstate,
      minWidth: realEstate,
    },
    footerContainer: {
      marginTop: sizes.spacing.SM,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: sizes.spacing.MED,
    },
    footerControl: {
      width: realEstate,
      minWidth: realEstate,
    },
    footerButton,
    footerButtonLeft: {
      ...footerButton,
      marginRight: sizes.spacing.XS,
    },
  });
};


export default styles;
