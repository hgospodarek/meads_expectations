import React from 'react';

const Recipe = props => {
  let link = `/recipes/${props.id}`

  return (
    <li>
      <p><a href={link}>{props.title}</a></p>
      <p>{props.variety}</p>
      <p>{props.sweetness}</p>
    </li>
  );
};

export default Recipe;
