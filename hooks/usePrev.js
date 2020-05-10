import React from 'react';


const usePrevious = (value) => {
  // the ref object is a generic container whose current property is mutable,
  // and can hold any value, similar to an instance property on a class
  const ref = React.useRef();

  // store current value in ref, as a side-effect
  // (to *only* re-run when value changes, we could pass `[value]` as the second arg)
  React.useEffect(() => {
    ref.current = value;
  });

  // return previous value (happens before update in useEffect above)
  return ref.current;
};


export default usePrevious;
