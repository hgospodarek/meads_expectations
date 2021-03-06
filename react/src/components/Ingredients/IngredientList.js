import React from 'react';
import Ingredient from './Ingredient';

const IngredientList = props => {
  let ingredients = props.ingredients.map(ingredient => {
    const { id, name, unit, amount } = ingredient;
    let onDelete = () => props.handleIngredientDelete(id);

    return (
      <Ingredient
        key={id}
        id={id}
        name={name}
        unit={unit}
        amount={amount}
        handleIngredient={onDelete}
        buttonText={props.buttonText}
      />
    );
  });

  return (
    <div className="row column ingredient-list">
      <ul className="ingredient-list">
        {ingredients}
      </ul>
    </div>
  );
};

export default IngredientList;
