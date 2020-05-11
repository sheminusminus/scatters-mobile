import React from 'react';
import { Layout, List, Text, Input } from '@ui-kitten/components';

import { Timer } from '../../components';

import styles from './styles';


const ListScreen = (props) => {
  const {
    allowAnswers,
    answers,
    hideList,
    items,
    onAnswer,
    roll,
  } = props;

  const renderItem = ({ item, index }) => (
    <Layout style={styles.listItem}>
      <Layout style={styles.listQuestion}>
        {hideList && (
          <Layout style={styles.listQuestionRedacted} level="4" />
        )}
        {!hideList && (
          <Text category="label">
            {(`${index + 1}) ${item}`).toUpperCase()}
          </Text>
        )}
      </Layout>
      <Layout>
        <Input
          disabled={!allowAnswers}
          onChangeText={(val) => {
            onAnswer(val, index);
          }}
          value={answers[index]}
        />
      </Layout>
    </Layout>
  );

  return (
    <Layout style={styles.container}>
      <Layout
        style={[
          styles.headerContainer,
          {
            zIndex: hideList ? undefined : 1000,
          },
        ]}
      >
        <Text style={styles.roll}>{roll}</Text>
        <Timer />
      </Layout>

      <Layout
        style={[
          styles.listContainer,
          {
            zIndex: hideList ? undefined : 100,
          }
        ]}
      >
        <Layout style={styles.list}>
          <List
            style={styles.listInner}
            data={items}
            renderItem={renderItem}
          />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default ListScreen;
