import React from 'react';
import { Keyboard, Dimensions } from 'react-native';
import { Layout, List, Text, Input } from '@ui-kitten/components';

import { Timer } from '../../components';

import styles from './styles';


const { height: h } = Dimensions.get('window');

const ListScreen = (props) => {
  const {
    allowAnswers,
    answers,
    hideList,
    items,
    onAnswer,
    roll,
  } = props;

  const input = React.useRef(null);
  const [height, setHeight] = React.useState(0);
  const [focused, setFocused] = React.useState(-1);

  const _keyboardDidShow = (e) => {
    setHeight(e?.endCoordinates?.height + 24);
  };

  const _keyboardDidHide = () => {
    setHeight(0);
  };

  React.useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  const handleNext = () => {
    if (focused < items.length && input.current) {
      input.current.focus();
    }
  };

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
          returnKeyType="next"
          ref={focused === (index - 1) ? input : undefined}
          disabled={!allowAnswers}
          onChangeText={(val) => {
            onAnswer(val, index);
          }}
          onSubmitEditing={handleNext}
          onFocus={() => {
            setFocused(index);
          }}
          value={answers[index]}
        />
      </Layout>
    </Layout>
  );

  return (
    <Layout
      style={[
        styles.container
      ]}
    >
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
            style={[styles.listInner,  {
              height: h - 100 - height,
              maxHeight: h - 100 - height,
            }]}
            data={items}
            renderItem={renderItem}
          />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default ListScreen;
