import React from 'react';

let BatchHeader = ({
  name,
  sweetness,
  title,
  variety
}) => {
  return(
    <div className="batch-header">
      <h1 className="text-center main-text-color">{name}</h1>
      <h4 className="text-center">Recipe: {title}</h4>
      <h5 className="text-center">{sweetness} {variety}</h5>
    </div>
  );
};

export default BatchHeader;
