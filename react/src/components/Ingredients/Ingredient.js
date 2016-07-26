import React from 'react';

const Ingredient = props => {
  let id = `ingredient-${props.id}`

  return (
    <div id={id} className="ingredient callout small">
      <div className="row">
        <div className="columns small-11">
          <li>
            {props.amount} {props.unit} {props.name}
          </li>
        </div>
        <div className="columns small-1">
          <i onClick={props.handleDelete}className="fa fa-trash-o" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  );
};

export default Ingredient;
