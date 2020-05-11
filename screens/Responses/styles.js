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
  questionContainer: {
    position: 'absolute',
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
    position: 'absolute',
    top: 100,
    width,
    height: height - 100,
    flex: 1,
  },
  list: {
    width,
    height: height - 100,
    paddingBottom: sizes.spacing.XL * 2,
    paddingTop: sizes.spacing.SM,
  },
  listInner: {
    height: height - 100,
  },
  responseContainer: {
    flex: 1,
    paddingBottom: sizes.spacing.XS,
  },
  answerContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingLeft: sizes.spacing.SM,
    marginBottom: sizes.spacing.XS,
  },
  answer: {
    alignSelf: 'flex-start',
  },
  noAnswer: {
    alignSelf: 'flex-start',
    opacity: 0.5,
  },
  actionsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: sizes.spacing.SM + 200,
    maxWidth: sizes.spacing.SM + 200,
  },
  nameContainer: {
    // width: width - (sizes.spacing.MED + 200),
    width: width - ((sizes.spacing.SM * 3) + 200),
    // maxWidth: width - (sizes.spacing.MED + 200),
    maxWidth: width - ((sizes.spacing.SM * 3) + 200),
    alignSelf: 'center',
    paddingRight: sizes.spacing.SM,
  },
  name: {
    width: '100%',
    textAlign: 'right',
    opacity: 0.5,
    textTransform: 'uppercase',
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 50,
    width,
    paddingRight: sizes.spacing.SM,
    paddingLeft: sizes.spacing.SM,
  },
  actionLeft: {
    width: 100,
    marginRight: sizes.spacing.SM,
    alignSelf: 'center',
  },
  actionRight: {
    width: 100,
    alignSelf: 'center',
  },
  actionSelected: {

  },
});


export { diceSize };
export default styles;