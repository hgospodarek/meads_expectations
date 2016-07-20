import React from 'react';

const IngredientForm = props => {
  return (
    <div className="row ingredients-form">
      <div className="small-12 columns">
        <form onSubmit={props.handleAddIngredient}>
            <input
              type="number"
              onChange={props.handleIngredientNumber}
            />
            <input
              type="text"
              placeholder="unit"
              onChange={props.handleUnit}
            />
            <input
              type="text"
              placeholder="ingredient"
              value={props.ingredient}
              onChange={props.handleIngredient}
            />
              <input type="submit" className="button" value="Add Ingredient" />
        </form>
      </div>
    </div>

  );
};

export default IngredientForm;
