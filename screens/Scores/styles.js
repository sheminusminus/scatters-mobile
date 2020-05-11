import { Dimensions, StyleSheet } from 'react-native';

import { sizes } from '../../constants';


const { height, width } = Dimensions.get('window');

const diceSize = 80;

const lineWidth = width - (sizes.spacing.SM * 2);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scoreContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: sizes.spacing.SM,
    paddingTop: sizes.spacing.SM,
    paddingLeft: sizes.spacing.SM,
    paddingRight: sizes.spacing.SM,
  },
  questionContainer: {
    width,
    height: 100,
    maxHeight: 100,
    paddingTop: 60,
    paddingLeft: sizes.spacing.SM,
    paddingRight: sizes.spacing.SM,
  },
  question: {
    width: '100%',
    textAlign: 'center',
    opacity: 0.5,
  },
  listContainer: {
    width,
    height: height - 200,
    flex: 1,
  },
  list: {
    width,
    paddingBottom: sizes.spacing.XL * 2,
    paddingTop: sizes.spacing.SM,
  },
  listInner: {
    height: height - 200,
  },
  totalContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: lineWidth / 2,
    maxWidth: lineWidth / 2,
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: lineWidth / 2,
    maxWidth: lineWidth / 2,
  },
  name: {
    width: '100%',
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  total: {
    width: '100%',
    textAlign: 'right',
    textTransform: 'uppercase',
  },
  actionContainer: {
    height: 100,
    maxHeight: 100,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
  },
  action: {
    maxHeight: 40,
    alignSelf: 'flex-start',
  },
});


export { diceSize };
export default styles;
