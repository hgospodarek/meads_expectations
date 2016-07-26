import React from 'react';

const Ingredient = props => {
  let id = `ingredient-${props.id}`
  let maybebutton;

  if(props.buttonText) {
    maybebutton =  <i className={props.buttonText} aria-hidden="true" onClick={props.handleIngredient}></i>
  }

  return (
    <div id={id} className="ingredient callout small">
      <div className="row">
        <div className="columns small-11">
          <li>
            {props.amount} {props.unit} {props.name}
          </li>
        </div>
        <div className="columns small-1">
          {maybebutton}
        </div>
      </div>
    </div>
  );
};

export default Ingredient;
