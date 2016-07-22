import React from 'react';
import Recipe from './Recipe';

const RecipeList = props => {
  let recipes = props.recipes.map(recipe => {
    const { id, title, sweetness, variety } = recipe;
    let onDelete = () => props.handleRecipeDelete(id);

    return (
      <Recipe
        key={id}
        id={id}
        title={title}
        sweetness={sweetness}
        variety={variety}
        handleDelete={onDelete}
      />
    );
  });

  return (
    <div className="recipe-list">
        <ul>
          {recipes}
        </ul>
    </div>
  );
};

export default RecipeList;
