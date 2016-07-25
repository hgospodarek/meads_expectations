import React from 'react';
import Ingredient from './Ingredient';

const IngredientList = props => {
  let ingredients = props.ingredients.map(ingredient => {
    const { id, name, unit, amount } = ingredient;
    let onDelete = () => props.handleIngredientDelete(id);
    debugger;

    return (
      <Ingredient
        key={id}
        id={id}
        name={name}
        unit={unit}
        amount={amount}
        handleDelete={onDelete}
      />
    );
  });

  return (
    <div className="row ingredient-list">
        <ul>
          {ingredients}
        </ul>
    </div>
  );
};

export default IngredientList;