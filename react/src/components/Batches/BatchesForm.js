import React from 'react';

const BatchesForm = props => {

  let recipe_options = props.recipes.map(recipe => {
    return (
      <option>{recipe.title}</option>
    )
  })

  return (
    <div className="small-12 columns batch-form form-container">
        <form onSubmit={props.handleFormSubmit}>
          <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="batch name"
              value={props.name}
              onChange={props.handleChange}
              required={true}
            />
          <label htmlFor="recipe">Recipe</label>
            <select
              id="recipe"
              name="recipe"
              onChange={props.handleChange}
              required={true}
            >
            <option value="">Select your option</option>
            {recipe_options}
            </select>
            <div className="text-center">
              <input type="submit" className="button large" value="Start Batch" />
            </div>
        </form>
    </div>
  );
};

export default BatchesForm;
