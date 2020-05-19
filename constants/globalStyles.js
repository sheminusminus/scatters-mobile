import * as Device from 'expo-device';

import { getDimensions } from '../utils';

import { spacing } from './sizes';


const isX = Device.modelName.includes('X');


const { height, width } = getDimensions();

export const container = {
  paddingBottom: spacing.XL * 2,
  paddingTop: isX ? spacing.L * 2 : spacing.XL,
  minHeight: height,
  width,
};

export const titleContainer = {
  height: spacing.XL,
  maxHeight: spacing.XL,
  marginBottom: spacing.SM,
  flex: 1,
  flexDirection: 'row',
  maxWidth: width,
};

export const title = {
  width: '100%',
  textAlign: 'center',
  alignSelf: 'center',
  opacity: 0.7,
};

export { height, width, isX };
