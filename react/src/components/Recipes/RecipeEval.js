import React from 'react';

let RecipeEval = ({
  handleRecipeFailure,
  handleRecipeSuccess
}) => {
  return(
    <div className="recipe-eval">
      <div className="row">
        <div className="columns small-12 text-center">
          <h4 className="text-center">
            How did the latest attempt at this recipe go?
          </h4>
          <button className="large button right-margin" onClick={handleRecipeSuccess}>Success</button>
          <button className="large button left-margin" onClick={handleRecipeFailure}>Failure</button>
        </div>
      </div>
    </div>
  );
};

export default RecipeEval;
