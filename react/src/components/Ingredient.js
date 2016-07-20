import React from 'react';

const Ingredient = props => {

  return (
    <li className="ingredient"> {props.amount} {props.unit} {props.name}{' '}
      <button className="button" type="button" onClick={props.handleDelete}>Delete</button>
    </li>
  );
};

export default Ingredient;
