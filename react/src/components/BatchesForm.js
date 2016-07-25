import React from 'react';

const BatchesForm = props => {

  let recipe_options = props.recipes.map(recipe => {
    return (
      <option>{recipe.title}</option>
    )
  })
  $('select').material_select();

  return (
    <div className="batch-form">
        <form onSubmit={props.handleFormSubmit}>
          <div className="row">
            <div className="input-field s6">
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
            </div>
            <div className="input-field s6">
              <select
                id="recipe"
                name="recipe"
                onChange={props.handleChange}
                required={true}
                >
                <option disabled selected>Select your option</option>
                {recipe_options}
              </select>
              <label>Recipe</label>
            </div>
          </div>
          <div className="center">
            <button type="submit" className="waves-effect waves-light btn">Submit Batch</button>
          </div>
        </form>
    </div>
  );
};

export default BatchesForm;
