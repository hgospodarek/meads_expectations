import React from 'react';

let BatchToRecipeForm = ({
  handleChange,
  handleSaveAsRecipe,
  newTitle
}) => {
  return(
    <div className="saveable-form">
      <hr></hr>
      <h5 className="text-center">Save batch as a new recipe?</h5>
      <form onSubmit={handleSaveAsRecipe}>
        <div className="row">
          <div className="columns small-12">
            <input
              id="new recipe"
              type="text"
              name="newTitle"
              placeholder="new recipe title"
              value={newTitle}
              onChange={handleChange}
              required={true}
              />
          </div>
        </div>
        <div className="text-center">
          <input type="submit" className="button large" value="Save" />
        </div>
      </form>
    </div>
  );
};

export default BatchToRecipeForm;
