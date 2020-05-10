import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { emitName, retrieveName } from '../../actions';

import { getPlayerName, getPlayerLookedForName } from '../../selectors';

import screen from './Entry';


const mapState = createStructuredSelector({
  name: getPlayerName,
  lookedForName: getPlayerLookedForName,
});

const mapDispatch = {
  onEmitName: emitName.trigger,
  onRetrieveName: retrieveName.trigger,
};


export default connect(mapState, mapDispatch)(screen);
