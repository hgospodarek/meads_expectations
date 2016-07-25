import React from 'react';

const BatchesForm = props => {

  let recipe_options = props.recipes.map(recipe => {
    return (
      <option>{recipe.title}</option>
    )
  })

  return (
    <div className="small-12 columns recipe-form">
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
            <option defaultValue="" disabled selected>Select your option</option>
            {recipe_options}
            </select>
              <input type="submit" className="button" value="Submit Batch" />
        </form>
    </div>
  );
};

export default BatchesForm;
