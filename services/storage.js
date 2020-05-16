import { AsyncStorage } from 'react-native';


const PREFIX = '@Scatters:';

class Storage {
  static makeKey = (key) => `${PREFIX}${key}`;

  static kNAME = Storage.makeKey('username');
  static kToken = Storage.makeKey('pushToken');
  static kInviteCategory = Storage.makeKey('createdRoomInviteCategory');

  static save = async (k, value) => {
    const key = Storage.makeKey(k);
    try {
      await AsyncStorage.setItem(key, value);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  static load = async (k) => {
    const key = Storage.makeKey(k);

    try {
      return AsyncStorage.getItem(key);
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };

  static eraseAll = async () => {
    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys);
  };
}


export default Storage;
