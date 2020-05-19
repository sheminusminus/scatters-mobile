import { sizes, globalStyles } from '../../constants';

import { getDimensions } from '../../utils';


const getStyles = () => {
  const { height } = getDimensions();
  const listHeight = height - (sizes.spacing.XL * 2);

  return {
    container: {
      ...globalStyles.container,
      flex: 1,
      justifyContent: 'space-between',
    },
    titleContainer: {
      ...globalStyles.titleContainer,
    },
    title: {
      ...globalStyles.title,
    },
    list: {
      maxHeight: listHeight,
    },
    listItem: {
      paddingLeft: sizes.spacing.SM,
      paddingRight: sizes.spacing.SM,
    },
  };
};

export default getStyles;
