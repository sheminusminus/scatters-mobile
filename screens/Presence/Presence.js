import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Text } from '@ui-kitten/components';

import { PlayerList } from '../../components';

import getStyles from './styles';


const Presence = (props) => {
  const {
    allPlayers,
    onGetAllPlayers,
    onSendPushNotif,
    route,
  } = props;

  React.useEffect(() => {
    onGetAllPlayers();
  }, [onGetAllPlayers]);

  const styles = getStyles();

  return (
    <Layout style={styles.container}>
      <Layout style={styles.titleContainer}>
        <Text category="label" style={styles.title}>
          SCATTERS WITH FRIENDS
        </Text>
      </Layout>
      <PlayerList
        headerText="All players"
        onSelect={(player) => {
          onSendPushNotif({ to: player, room: route.params.room });
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
  onSendPushNotif: PropTypes.func.isRequired,
  route: PropTypes.shape().isRequired,
};

export default Presence;
