import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { Divider, List, ListItem, Layout, Text } from '@ui-kitten/components';

import { Intent } from '../constants';


const styles = {
  item: {
    flex: 1,
    justifyContent: 'center',
    minHeight: 50,
    paddingHorizontal: 16,
  },
  text: {},
  selectedText: {
    color: 'rgb(0, 224, 150)',
  },
};

const RoomsMenu = (props) => {
  const {
    ListHeaderComponent,
    items,
    selected,
    setSelected,
    style,
  } = props;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        if (item === selected) {
          setSelected(null);
        } else {
          setSelected(item);
        }
      }}
    >
      <Layout style={styles.item} level={item === selected ? '2' : undefined}>
        <Text
          category="c2"
          status={item === selected ? Intent.SUCCESS : undefined}
        >
          {item}
        </Text>
      </Layout>
    </TouchableOpacity>
  );

  return (
    <List
      ListHeaderComponent={ListHeaderComponent}
      ItemSeparatorComponent={Divider}
      data={items}
      renderItem={renderItem}
      style={style}
    />
  );
};

RoomsMenu.propTypes = {
  items: PropTypes.array.isRequired,
  selected: PropTypes.any,
  setSelected: PropTypes.func.isRequired,
};


export default RoomsMenu;
