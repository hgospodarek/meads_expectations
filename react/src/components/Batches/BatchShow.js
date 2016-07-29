import React from 'react';
import IngredientForm from '../Ingredients/IngredientForm'
import StartEndBatch from './StartEndBatch'
import StepList from '../Steps/StepList'
import StepForm from '../Steps/StepForm'
import Hydrometer from './Hydrometer'
import BatchComparison from './BatchComparison'
import IngredientList from '../Ingredients/IngredientList'
import BatchToRecipeForm from './BatchToRecipeForm';
import BatchStepsSection from './BatchStepsSection';
import BatchHeader from './BatchHeader'
import RecipeEval from '../Recipes/RecipeEval';

let BatchShow = ({
  action,
  approxABV,
  batch,
  completed_steps,
  current_step,
  endDate,
  finalHydrometer,
  handleBranchOff,
  handleChange,
  handleEndClick,
  handleHydrometer,
  handleRecipeFailure,
  handleRecipeSuccess,
  handleSaveAsRecipe,
  handleStepComplete,
  hydrometerField,
  initialHydrometer,
  newTitle,
  startDate,
  variation
}) => {
  let finalHydro;
  let saveable;
  let compareOrRecipeEval;

  if (batch === null) {
    return null;
  }
  if (initialHydrometer != null) {
    finalHydro = <Hydrometer
      hydrometerField={hydrometerField}
      reading={finalHydrometer}
      name="hydrometerField"
      label="Final Hydrometer Reading"
      modelAttr="final_hydrometer"
      handleChange={handleChange}
      formSubmit={handleHydrometer}
      />
  }

  if (endDate != null && variation == true) {
    saveable = <BatchToRecipeForm
      handleChange={handleChange}
      handleSaveAsRecipe={handleSaveAsRecipe}
      newTitle={newTitle}
      />
  }

  if ((endDate != null ) && (batch.variation == true)) {
    compareOrRecipeEval = <BatchComparison
      completedRecipeSteps={batch.completed_recipe_steps}
      recipeSteps={batch.incomplete_recipe_steps}
      batchSteps={batch.new_steps}
      />
  } else if (endDate != null && (batch.variation == false)) {
    compareOrRecipeEval = <RecipeEval
      handleRecipeFailure={handleRecipeFailure}
      handleRecipeSuccess={handleRecipeSuccess}
      />
  }

  return(
    <div className="row column">
      <div className="react-batch row">
        <BatchHeader
          name={batch.name}
          title={batch.recipe.title}
          sweetness={batch.recipe.sweetness}
          variety={batch.recipe.variety}
          />
        <div className="small-12 large-6 columns">
          <div className="section">
            <div className="small-12 columns">
              <StartEndBatch
                startDate={startDate}
                endDate={endDate}
                endClick={handleEndClick}
                />
            </div>
            <div className="row">
              <div className="small-6 columns text-center">
                <Hydrometer
                  hydrometerField={hydrometerField}
                  reading={initialHydrometer}
                  name="hydrometerField"
                  label="Initial Hydrometer Reading"
                  modelAttr="initial_hydrometer"
                  handleChange={handleChange}
                  formSubmit={handleHydrometer}
                  />
              </div>
              <div className="small-6 columns text-center">
                {finalHydro}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="columns small-12">
              <h5 className="text-center abv">Approx. ABV: {approxABV}</h5>
            </div>
            <hr></hr>
          </div>
          <div className="row">
            <div className="columns small-12">
              <h5 className="text-center">Ingredients:</h5>
              <IngredientList
                ingredients={batch.ingredients}
                />
            </div>
          </div>
          <div className="row">
            <div className="columns small-12">
              <BatchStepsSection
                action={action}
                completedSteps={completed_steps}
                currentStep={current_step}
                handleBranchOff={handleBranchOff}
                handleChange={handleChange}
                handleStepComplete={handleStepComplete}
                />
            </div>
          </div>
        </div>
        <div className="small-12 large-6 columns">
          {compareOrRecipeEval}
          {saveable}
        </div>
      </div>
    </div>
  );
}

export default BatchShow;
