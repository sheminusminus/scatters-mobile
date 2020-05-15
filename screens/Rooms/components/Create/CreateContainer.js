import { connect } from 'react-redux';

import { createRoom } from '../../../../actions';

import screen from './Create';


const mapDispatch = {
  onDone: createRoom.trigger,
};


export default connect(null, mapDispatch)(screen);
