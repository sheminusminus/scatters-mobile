import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  getRoundAllowAnswers,
  getRoundHideList,
  getRoundAnswers,
  getGameListItems,
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
    />
  );
};

const mapStateToProps = createStructuredSelector({
  allowAnswers: getRoundAllowAnswers,
  answers: getRoundAnswers,
  hideList: getRoundHideList,
  listItems: getGameListItems,
});

const mapDispatchToProps = {
  onSetAnswers: roundSetAnswers.trigger,
};


export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
