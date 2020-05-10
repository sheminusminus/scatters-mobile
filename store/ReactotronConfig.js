import { AsyncStorage } from 'react-native';
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';


const reactotron = Reactotron
  .setAsyncStorageHandler(AsyncStorage)
  .configure({
    name: 'Scatters',
  })
  .useReactNative()
  .use(reactotronRedux({
    except: ['EFFECT_TRIGGERED', 'EFFECT_RESOLVED', 'EFFECT_REJECTED'],
  }))
  .use(sagaPlugin())
  .connect();


export default reactotron;
