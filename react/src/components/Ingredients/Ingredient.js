import React from 'react';

const Ingredient = props => {
  let id = `ingredient-${props.id}`
  let maybebutton;

  if(props.buttonText) {
    maybebutton =  <i id="ingredient-button" className={props.buttonText} aria-hidden="true" onClick={props.handleIngredient}></i>
  }

  return (
    <div className="row">
      <div className="columns small-12">
        <div id={id} className="ingredient callout small">
          <div className="row">
            <div className="columns small-10">
              <li>
                {props.amount} {props.unit} {props.name}
              </li>
            </div>
            <div className="columns small-2">
              {maybebutton}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ingredient;
