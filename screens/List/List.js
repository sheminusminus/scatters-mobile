import React from 'react';
import { Animated } from 'react-native';
import { Layout, List, Text, Input } from '@ui-kitten/components';

import { Timer } from '../../components';

import styles from './styles';


const data = new Array(8).fill({
  title: 'Item',
});

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
          <Text>{`${index + 1}) ${item}`}</Text>
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
      <Layout style={styles.headerContainer}>
        <Text style={styles.roll}>{roll}</Text>
        <Timer />
      </Layout>

      <Layout style={styles.listContainer}>
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
  // return (
  //   <div className="paper-container">
  //     <div className="list paper">
  //       <div className="paper-content">
  //         <ol className="list-ol" style={{ width: '440px', margin: '0 auto' }}>
  //           {items.map((item, idx) => (
  //             <li
  //               className="list-item"
  //               key={item}
  //             >
  //               <div className="list-item-label">
  //                 <span className="num">{idx + 1}</span>
  //               </div>
  //               <div className="list-item-content">
  //                 <span className="prompt">
  //                 {hideList && (
  //                   <span className="redacted" />
  //                 )}
  //                   {!hideList && (
  //                     <span>{item}</span>
  //                   )}
  //               </span>
  //                 <span
  //                   className={classNames({
  //                     answer: true,
  //                     disabledEmpty: Boolean(!allowAnswers && !answers[idx]),
  //                     disabledValue: Boolean(!allowAnswers && answers[idx]),
  //                   })}
  //                 >
  //                 <input
  //                   autoFocus={allowAnswers && idx === 0}
  //                   disabled={!allowAnswers}
  //                   onChange={(evt) => {
  //                     onAnswer(evt.target.value, idx);
  //                   }}
  //                   value={answers[idx] || ''}
  //                   style={{ width: '100%' }}
  //                 />
  //               </span>
  //               </div>
  //             </li>
  //           ))}
  //         </ol>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default ListScreen;
