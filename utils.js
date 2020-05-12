import { Dimensions } from 'react-native';


export const msToMMSS = (ms) => {
  const sec = Math.floor(ms / 1000);
  const minutes = Math.floor(sec / 60);
  const secRemainder = sec - (minutes * 60);

  let minString = String(minutes);
  let secString = String(secRemainder);

  if (minutes < 10) {
    minString = `0${minutes}`;
  }
  if (secRemainder < 10) {
    secString = `0${secRemainder}`;
  }
  return `${minString}:${secString}`;
};

export const getDimensions = () => Dimensions.get('window');
