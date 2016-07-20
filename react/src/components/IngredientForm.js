import React from 'react';

const IngredientForm = props => {
  return (
    <div className="small-12 medium-6 columns ingredients-form">
        <form onSubmit={props.handleAddIngredient}>
            <input
              type="number"
              placeholder="0"
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

  );
};

export default IngredientForm;
