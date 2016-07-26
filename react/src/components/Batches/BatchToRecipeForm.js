import React from 'react';

let BatchToRecipeForm = ({
  handleChange,
  handleSaveAsRecipe,
  newTitle
}) => {
  return(
    <div className="saveable-form">
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
          <input type="submit" className="button" value="Submit Batch as New Recipe?" />
        </div>
      </form>
    </div>
  );
};

export default BatchToRecipeForm;
