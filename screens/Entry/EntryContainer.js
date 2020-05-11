import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { emitName, retrieveName } from '../../actions';

import { getPlayerName, getPlayerLookedForName, getPlayerRooms } from '../../selectors';

import screen from './Entry';


const mapState = createStructuredSelector({
  name: getPlayerName,
  lookedForName: getPlayerLookedForName,
  rooms: getPlayerRooms,
});

const mapDispatch = {
  onEmitName: emitName.trigger,
  onRetrieveName: retrieveName.trigger,
};


export default connect(mapState, mapDispatch)(screen);
