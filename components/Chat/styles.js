import { StyleSheet } from 'react-native';

import { sizes, globalStyles } from '../../constants';
import { getDimensions } from '../../utils';


const styles = () => {
  const { height } = getDimensions();
  return StyleSheet.create({
    container: {
      ...globalStyles.container,
      height: height,
      minHeight: height,
      backgroundColor: 'blue',
      justifyContent: 'space-between',
      paddingBottom: 0,
    },
    titleContainer: {
      ...globalStyles.titleContainer,
      minHeight: globalStyles.titleContainer.height,
      backgroundColor: 'green',
    },
    title: {
      ...globalStyles.title,
    },
    messagesContainer: {
      marginTop: globalStyles.titleContainer.height,
      minHeight: globalStyles.height - (globalStyles.titleContainer.height) - 100,
      height: globalStyles.height - (globalStyles.titleContainer.height) - 100,
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'pink',
      paddingBottom: 0,
    },
    inputContainer: {
      ...globalStyles.titleContainer,
      height: 60,
      maxHeight: 60,
      minHeight: 60,
    },
    inputField: {
      width: globalStyles.width,
    },
  });
};


export default styles;
