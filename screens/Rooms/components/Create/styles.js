import { StyleSheet } from 'react-native';

import { sizes } from '../../../../constants';
import { getDimensions } from '../../../../utils';


const { height, width } = getDimensions();

// const realEstate = ((width - (sizes.spacing.MED * 2)) - sizes.spacing.MED) * 0.5;
const realEstate = '40%';

const footerButton = {
  width: realEstate,
  minWidth: realEstate,
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
      paddingBottom: sizes.spacing.XL * 2,
      paddingTop: sizes.spacing.L * 2,
      minHeight: height,
      width,
    },
    titleContainer: {
      flex: 1,
      justifyContent: 'center',
      height: sizes.spacing.XL,
      maxHeight: sizes.spacing.XL,
      maxWidth: width,
      marginBottom: sizes.spacing.SM,
      paddingHorizontal: sizes.spacing.MED,
    },
    title: {
      width,
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
      marginTop: sizes.spacing.XL,
      marginBottom: sizes.spacing.SM,
      marginHorizontal: 0,
      paddingHorizontal: sizes.spacing.L,
    },
    checkboxContainer: {
      marginTop: sizes.spacing.L,
      marginBottom: sizes.spacing.XL,
      paddingHorizontal: sizes.spacing.L,
    },
    checkbox: {
      marginBottom: sizes.spacing.MED,
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
