import { Dimensions, StyleSheet } from 'react-native';

import { sizes, globalStyles } from '../../constants';


const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: height,
    width,
  },
  avoidingContainer: {
    height: height - 72,
    marginTop: 72,
  },
  headerContainer: {
    flex: 1,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width,
    height: 72,
    maxHeight: 72,
    paddingTop: 32,
    paddingLeft: sizes.spacing.SM,
    paddingRight: sizes.spacing.SM,
  },
  listContainer: {
    position: 'absolute',
    top: 72,
    width,
    height: globalStyles.height - 72,
    flex: 1,
    // paddingBottom: sizes.spacing.L,
  },
  list: {
    width,
    height: height - 72,
    paddingTop: sizes.spacing.SM,
  },
  listInner: {

  },
  listItem: {
    paddingLeft: sizes.spacing.SM,
    paddingRight: sizes.spacing.SM,
    paddingTop: sizes.spacing.XS,
    paddingBottom: sizes.spacing.XS,
  },
  listItemText: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  listItemNum: {
    opacity: 0.5,
  },
  listItemLabel: {
    marginLeft: sizes.spacing.XS,
  },
  listQuestion: {
    marginBottom: sizes.spacing.SM,
  },
  listQuestionRedacted: {
    height: 20,
    width: '100%',
    marginBottom: sizes.spacing.XS,
  },
  roll: {
    width: (width - (sizes.spacing.SM * 2)) * 0.15,
    textAlign: 'left',
    fontSize: 28,
    fontWeight: 'bold',
    opacity: 0.8,
    alignSelf: 'center',
  },
  timer: {
    width: (width - (sizes.spacing.SM * 2)) * 0.85,
    backgroundColor: 'pink',
    height: 6,
    alignSelf: 'center',
    borderRadius: 2,
  },
});

export { height };
export default styles;
