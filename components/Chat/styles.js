import { StyleSheet } from 'react-native';

import { sizes, globalStyles } from '../../constants';
import { getDimensions } from '../../utils';


const styles = () => {
  return StyleSheet.create({
    container: {
      maxHeight: (globalStyles.height * 0.3) + sizes.spacing.SM,
      width: globalStyles.width,
      position: 'absolute',
      flex: 1,
      justifyContent: 'flex-end',
      // bottom: globalStyles.isX ? 0 : -40,
      bottom: 0,
      backgroundColor: '#222b45',
      borderTopColor: '#101426',
      borderTopWidth: 1,
      paddingTop: 8,
      paddingBottom: sizes.spacing.SM,
      // ...globalStyles.container,
      // minHeight: height,
      // justifyContent: 'space-between',
      // paddingBottom: 0,
    },
    titleContainer: {
      // ...globalStyles.titleContainer,
      // minHeight: globalStyles.titleContainer.height,
    },
    title: {
      // ...globalStyles.title,
    },
    messagesContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingBottom: globalStyles.isX ? 24 : 0,
      // marginTop: globalStyles.titleContainer.height,
      // minHeight: globalStyles.height - (globalStyles.titleContainer.height) - 100,
      // height: globalStyles.height - (globalStyles.titleContainer.height) - 100,
      // flex: 1,
      // justifyContent: 'flex-end',
      // paddingBottom: 0,
    },
    messageItem: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      paddingHorizontal: 16,
      paddingVertical: 4,
    },
    messageItemName: {
      opacity: 0.6,
    },
    messageItemText: {
      paddingLeft: 4,
    },
    messageInput: {
      flex: 1,
      marginHorizontal: 8,
    },
    sendButton: {
      marginRight: 4,
    },
    iconButton: {
      width: 24,
      height: 24,
    },
    messageInputContainer: {
      flexDirection: 'row',
      paddingHorizontal: 8,
      paddingVertical: 16,
      // height: globalStyles.height * 0.3,
    },
    inputContainer: {
      // ...globalStyles.titleContainer,
      // height: 60,
      // maxHeight: 60,
      // minHeight: 60,
    },
    inputField: {
      marginBottom: globalStyles.isX ? 0 : -4,
      // position: 'absolute',
      // bottom: globalStyles.isX ? 88 : 0,
      // width: globalStyles.width,
    },
  });
};


export default styles;
