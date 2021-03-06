import React from 'react';

const IngredientForm = props => {
  return (
    <div className="ingredients-form form-container">
      <form onSubmit={props.handleAddIngredient}>
        <div className="row">
          <div className="columns small-3">
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              type="number"
              name="amount"
              placeholder="0.0"
              value={props.amount}
              onChange={props.handleChange}
              min="0.1"
              step="any"
              required={true}
              />
          </div>
          <div className="columns small-3">
            <label htmlFor="unit">Unit</label>
            <input
              id="unit"
              type="text"
              name="unit"
              placeholder="lbs"
              value={props.unit}
              onChange={props.handleChange}
              required={true}
              />
          </div>
          <div className="columns small-6">
            <label htmlFor="ingredient">Ingredient</label>
            <input
              id="ingredient"
              type="text"
              name="ingredient"
              placeholder="honey"
              value={props.ingredient}
              onChange={props.handleChange}
              required={true}
              />
          </div>
        </div>
        <div className="text-center">
          <input type="submit" className="button" value="Add Ingredient" />
        </div>
      </form>
    </div>
  );
};

export default IngredientForm;
