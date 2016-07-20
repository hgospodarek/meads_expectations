import React from 'react';

const IngredientForm = props => {
  return (
    <div className="small-12 medium-6 columns ingredients-form">
        <form onSubmit={props.handleAddIngredient}>
            <input
              type="number"
              name="amount"
              placeholder="0"
              value={props.amount}
              onChange={props.handleChange}
            />
            <input
              type="text"
              name="unit"
              placeholder="unit"
              value={props.unit}
              onChange={props.handleChange}
            />
            <input
              type="text"
              name="ingredient"
              placeholder="ingredient"
              value={props.ingredient}
              onChange={props.handleChange}
            />
              <input type="submit" className="button" value="Add Ingredient" />
        </form>
    </div>

  );
};

export default IngredientForm;
