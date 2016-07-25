import React from 'react';

const IngredientForm = props => {
  return (
    <div className="ingredients-form">
      <form onSubmit={props.handleAddIngredient}>
      <div className="row">
        <div className="input-field col s2">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            name="amount"
            placeholder="0.0"
            value={props.amount}
            onChange={props.handleChange}
            min="0.0"
            step="any"
            required={true}
            />
        </div>
        <div className="input-field col s4">
          <label htmlFor="unit">Unit</label>
          <input
            id="unit"
            type="text"
            name="unit"
            placeholder="unit"
            value={props.unit}
            onChange={props.handleChange}
            required={true}
            />
        </div>
        <div className="input-field col s6">
          <label htmlFor="ingredient">Ingredient</label>
          <input
            id="ingredient"
            type="text"
            name="ingredient"
            placeholder="ingredient"
            value={props.ingredient}
            onChange={props.handleChange}
            required={true}
            />
        </div>
      </div>
      <div className="center">
        <button type="submit" className="waves-effect waves-light btn" >Add Ingredient</button>        
      </div>
      </form>
    </div>

  );
};

export default IngredientForm;
