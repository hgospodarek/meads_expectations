import React from 'react';

const Recipe = props => {
  let recipeClass = `recipe-${props.id}`
  let link = `/recipes/${props.id}`
  return (
    <li className={recipeClass}>
        <p><a href={link}>{props.title}</a></p>
        <p>{props.variety}</p>
        <p>{props.sweetness}</p>
        <button className="button" type="button" onClick={props.handleDelete}>Delete</button>
    </li>
  );
};

export default Recipe;
