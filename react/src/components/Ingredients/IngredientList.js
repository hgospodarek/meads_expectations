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
        handleDelete={onDelete}
      />
    );
  });

  return (
    <div className="row column ingredient-list">
      <ul className="">
        {ingredients}
      </ul>
    </div>
  );
};

export default IngredientList;
