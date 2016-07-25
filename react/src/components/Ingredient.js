import React from 'react';

const Ingredient = props => {
  debugger;
  let id = `ingredient-${props.id}`

  return (
    <li id={id} className="ingredient center"> {props.amount} {props.unit} {props.name}{' '}
      <button className="waves-effect waves-light btn" type="button" onClick={props.handleDelete}>Delete</button>
    </li>
  );
};

export default Ingredient;
