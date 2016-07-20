import React from 'react';

const Ingredient = props => {

  return (
    <li className="ingredient">
      <span>{props.amount} {props.unit} {props.name}</span>
      <div className="float-right">
        <button className="button" type="button" onClick={props.handleDelete}>Delete</button>
      </div>
    </li>
  );
};

export default Ingredient;
