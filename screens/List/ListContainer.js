import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  getGameListItems,
  getGameRoll,
  getRoundAllowAnswers,
  getRoundAnswers,
  getRoundHideList,
} from '../../selectors';

import {
  roundSetAnswers,
} from '../../actions';

import List from './List';


const ListContainer = (props) => {
  const {
    allowAnswers,
    answers,
    hideList,
    listItems,
    onSetAnswers,
    ...rest
  } = props;

  const handleAnswer = React.useCallback((value, index) => {
    const nextAnswers = [...answers];
    nextAnswers[index] = value;
    onSetAnswers(nextAnswers);
  }, [answers]);

  return (
    <List
      allowAnswers={allowAnswers}
      answers={answers}
      hideList={hideList}
      items={listItems}
      onAnswer={handleAnswer}
      {...rest}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  allowAnswers: getRoundAllowAnswers,
  answers: getRoundAnswers,
  hideList: getRoundHideList,
  listItems: getGameListItems,
  roll: getGameRoll,
});

const mapDispatchToProps = {
  onSetAnswers: roundSetAnswers.trigger,
};


export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
