import React from 'react';

const Recipe = props => {
  let link = `/recipes/${props.id}`

  return (
    <a href={link}>
      <div className="callout small">
        <p className="main-text-color">{props.title}</p>
        <p>{props.variety}</p>
        <p>{props.sweetness}</p>
      </div>
    </a>
  );
};

export default Recipe;
