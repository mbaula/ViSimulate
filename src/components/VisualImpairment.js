import React, { useState } from 'react';
import Header from './Header'; // Import your custom Header component

const VisualImpairmentSimulator = () => {
  const [selectedImpairment, setSelectedImpairment] = useState(null);

  const handleImpairmentChange = (event) => {
    setSelectedImpairment(event.target.value);
  };

  return (
    <div>
      <Header /> 
    </div>
  );
};

export default VisualImpairmentSimulator;
