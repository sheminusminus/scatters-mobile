import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Divider, List, Layout, Text, Button, Icon } from '@ui-kitten/components';

import { getDimensions } from '../utils';

import ListHeader from './ListHeader';

import { sizes } from '../constants';


const InviteIcon = (props) => (
  <Icon {...props} name="paper-plane" />
);

const getStyles = () => {
  const { width } = getDimensions();
  return StyleSheet.create({
    name: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      // minHeight: 50,
      paddingVertical: sizes.spacing.XS,
      paddingHorizontal: sizes.spacing.XL,
      height: 48,
      maxWidth: width,
      alignItems: 'center',

    },
    header: {
      paddingHorizontal: sizes.spacing.MED,
    },
    text: {
      alignSelf: 'center',
    },
    selectedText: {
      color: 'rgb(0, 224, 150)',
    },
    list: {
      maxWidth: width,
    },
    invite: {
      alignSelf: 'center',
      maxWidth: 48,
      width: 48,
      maxHeight: 32,
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
    <Layout style={styles.name}>
      <Text category="c2">
        {item}
      </Text>
      <Button
        accessoryLeft={InviteIcon}
        size="tiny"
        style={styles.invite}
        onPress={() => {
          onSelect(item, index);
        }}
      />
    </Layout>
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
