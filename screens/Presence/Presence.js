import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Text } from '@ui-kitten/components';

import { Intent, sizes } from '../../constants';

import { getDimensions } from '../../utils';

import { PlayerList } from '../../components';
import { socket, events } from '../../services';


const getStyles = () => {
  const { height, width } = getDimensions();
  const listHeight = height - (sizes.spacing.XL * 2);

  return {
    container: {
      height,
      width,
      paddingBottom: sizes.spacing.XL * 2,
      paddingTop: sizes.spacing.XL * 2,
      flex: 1,
      justifyContent: 'space-between',
    },
    titleContainer: {
      flex: 1,
      flexDirection: 'row',
      height: sizes.spacing.MED,
      maxHeight: sizes.spacing.MED,
      maxWidth: width,
      marginBottom: sizes.spacing.SM,
    },
    title: {
      width: '100%',
      textAlign: 'center',
      alignSelf: 'center',
      opacity: 0.5,
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

const Presence = (props) => {
  const {
    allPlayers,
    onGetAllPlayers,
  } = props;

  const [token, setToken] = React.useState('');
  const [notif, setNotif] = React.useState({});

  React.useEffect(() => {
    onGetAllPlayers();
  }, [onGetAllPlayers]);

  const styles = getStyles();

  return (
    <Layout style={styles.container}>
      <Layout style={styles.titleContainer}>
        <Text category="h5" style={styles.title}>
          Scatters with Friends
        </Text>
      </Layout>
      <PlayerList
        headerText="All players"
        onSelect={async () => {

          socket.emit();
        }}
        players={allPlayers}
        style={styles.list}
        itemStyle={styles.listItem}
      />
    </Layout>
  );
};

Presence.propTypes = {
  allPlayers: PropTypes.array,
  onGetAllPlayers: PropTypes.func.isRequired,
};

export default Presence;
