import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Divider, List, Layout, Text } from '@ui-kitten/components';

import { getDimensions } from '../utils';

import ListHeader from './ListHeader';

import { sizes } from '../constants';


const getStyles = () => {
  const { width } = getDimensions();
  return StyleSheet.create({
    name: {
      flex: 1,
      justifyContent: 'center',
      minHeight: 50,
      paddingHorizontal: sizes.spacing.XL,
      maxWidth: width,
    },
    header: {
      paddingHorizontal: sizes.spacing.MED,
    },
    text: {},
    selectedText: {
      color: 'rgb(0, 224, 150)',
    },
    list: {
      maxWidth: width,
    },
  });
};

const PlayerList = (props) => {
  const {
    headerText,
    players,
    onSelect,
    style,
  } = props;

  const styles = getStyles();

  const renderHeader = () => <ListHeader style={styles.header}>{headerText}</ListHeader>;

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => {
        onSelect(item, index);
      }}
    >
      <Layout style={styles.name}>
        <Text category="c2">
          {item}
        </Text>
      </Layout>
    </TouchableOpacity>
  );

  return (
    <List
      ListHeaderComponent={renderHeader}
      ItemSeparatorComponent={Divider}
      data={players}
      renderItem={renderItem}
      style={style}
    />
  );
};

PlayerList.propTypes = {
  headerText: PropTypes.string.isRequired,
  players: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  style: PropTypes.shape(),
};


export default PlayerList;
