import { Dimensions, StyleSheet } from 'react-native';

import { sizes } from '../../constants';


const { height, width } = Dimensions.get('window');

const diceSize = 80;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    height,
    width,
  },
  headerContainer: {
    flex: 1,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width,
    height: 100,
    maxHeight: 100,
    paddingTop: 60,
    paddingLeft: sizes.spacing.SM,
    paddingRight: sizes.spacing.SM,
    zIndex: 1000,
  },
  listContainer: {
    position: 'absolute',
    top: 100,
    width,
    height: height - 100,
    flex: 1,
    zIndex: 100,
  },
  list: {
    width,
    height: height - 100,
    paddingBottom: sizes.spacing.XL * 2,
  },
  listInner: {
    height: height - 100,
  },
  listItem: {
    paddingLeft: sizes.spacing.SM,
    paddingRight: sizes.spacing.SM,
    paddingTop: sizes.spacing.XS,
    paddingBottom: sizes.spacing.XS,
  },
  listQuestion: {
    marginBottom: sizes.spacing.XS,
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


export { diceSize };
export default styles;
