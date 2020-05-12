import React from 'react';
import { useRoute } from '@react-navigation/native';


const withScreenSocketWrapper = (Component) => {
  const ComponentWithScreenSocketWrapper = (props) => {
    const route = useRoute();


    return (
      <Component {...props} />
    );
  };

  return ComponentWithScreenSocketWrapper;
};


export default withScreenSocketWrapper;
