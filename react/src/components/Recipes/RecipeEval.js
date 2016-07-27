import React from 'react';

let RecipeEval = ({
  handleRecipeFailure,
  handleRecipeSuccess
}) => {
  return(
    <div className="recipe-eval">
      <div className="row">
        <div className="columns small-12 text-center">
          <h5 className="text-center">
            How did the latest attempt at this recipe go?
          </h5>
          <button className="button right-margin" onClick={handleRecipeSuccess}>Success</button>
          <button className="button left-margin" onClick={handleRecipeFailure}>Failure</button>
        </div>
      </div>
    </div>
  );
};

export default RecipeEval;
