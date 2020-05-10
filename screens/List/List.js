import React from 'react';
import { Layout, Text } from '@ui-kitten/components';

import styles from './styles';


const List = (props) => {
  const {
    allowAnswers,
    answers,
    hideList,
    onAnswer,
    items,
  } = props;

  return (
    <Layout style={styles.container}>
      <Text>Test</Text>
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

export default List;
