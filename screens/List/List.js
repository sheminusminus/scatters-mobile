import React from 'react';
import { Layout, Text, Input } from '@ui-kitten/components';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'

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

  const scroller = React.useRef(null);
  const input = React.useRef(null);
  const [focused, setFocused] = React.useState(-1);

  const handleNext = () => {
    if (input.current) {
      input.current.focus();
    }
  };

  const toNode = (node) => {
    scroller.current.props.scrollToFocusedInput(node)
  };

  const renderItem = ({ item, index }) => (
    <Layout style={styles.listItem}>
      <Layout style={styles.listQuestion}>
        {hideList && (
          <Layout style={styles.listQuestionRedacted} level="4" />
        )}
        {!hideList && (
          <Layout style={styles.listItemText}>
            <Text style={[styles.listItemNum, { opacity: focused !== index && answers[index] ? 0.5 : 1 }]} category="label">{index + 1}</Text>
            <Text
              style={[styles.listItemLabel, { opacity: focused !== index && answers[index] ? 0.5 : 1 }]}
              category="label"
            >
              {item.toUpperCase()}
            </Text>
          </Layout>
        )}
      </Layout>
      <Layout>
        <Input
          returnKeyType="next"
          ref={
            focused === (index - 1)
            || (focused === items.length - 1 && index === 0)
              ? input
              : undefined}
          disabled={!allowAnswers}
          onChangeText={(val) => {
            onAnswer(val, index);
          }}
          onSubmitEditing={handleNext}
          onFocus={(evt) => {
            console.log(evt);
            toNode(evt.target);
            setFocused(index);
          }}
          value={answers[index]}
        />
      </Layout>
    </Layout>
  );

  return (
    <Layout>
      <Layout
        style={[styles.headerContainer, {
          zIndex: hideList ? undefined : 1000,
        }]}
      >
        <Text style={styles.roll}>{roll}</Text>
        <Timer />
      </Layout>

      <KeyboardAwareFlatList
        keyboardOpeningTime={0}
        extraHeight={32}
        innerRef={(el) => {
          scroller.current = el;
        }}
        keyExtractor={item => item}
        enableResetScrollToCoords={(focused + 1) >= Math.floor(items.length / 2)}
        contentContainerStyle={{ paddingTop: 80, paddingBottom: 24 }}
        data={items}
        renderItem={renderItem}
      />
    </Layout>
  );
};

export default ListScreen;
