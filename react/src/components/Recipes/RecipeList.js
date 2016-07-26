import React from 'react';
import Recipe from './Recipe';

const RecipeList = props => {
  let recipes = props.recipes.map(recipe => {
    const { id, title, sweetness, variety } = recipe;

    return (
      <Recipe
        key={id}
        id={id}
        title={title}
        sweetness={sweetness}
        variety={variety}
      />
    );
  });

  return (
    <div className="recipe-list text-center">
      {recipes}
    </div>
  );
};

export default RecipeList;
