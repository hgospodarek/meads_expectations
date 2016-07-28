import React from 'react';

let BlankCard = ({
  cardText
}) => {
  return (
    <div className="callout small">
      <p className="main-text-color text-center">Your {cardText} will appear here once you've made some!</p>
    </div>
  );
};

export default BlankCard;
