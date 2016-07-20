import React from 'react';

const Recipe = props => {

  return (
    <li className="recipe">
        <p><a href="#">{props.title}</a></p>
        <p>{props.variety}</p>
        <p>{props.sweetness}</p>
    </li>
  );
};

export default Recipe;
