import React from 'react';
import IngredientForm from '../Ingredients/IngredientForm'
import StartEndBatch from './StartEndBatch'
import StepList from '../Steps/StepList'
import StepForm from '../Steps/StepForm'
import Hydrometer from './Hydrometer'
import BatchComparison from './BatchComparison'
import IngredientList from '../Ingredients/IngredientList'

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
  handleSaveAsRecipe,
  handleStepComplete,
  hydrometerField,
  initialHydrometer,
  newTitle,
  startDate
}) => {
  let finalHydro;
  let saveable;
  let comparison;

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

  if (endDate != null) {
    saveable = <div className="saveable-form">
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
  }

  if ((endDate != null ) && batch.variation == true ) {
    comparison = <BatchComparison
      completedRecipeSteps={batch.completed_recipe_steps}
      recipeSteps={batch.incomplete_recipe_steps}
      batchSteps={batch.new_steps}
      />
  }

  return(
    <div className="row column">
      <div className="react-batch row">
        <h1 className="text-center main-text-color">{batch.name}</h1>
        <h4 className="text-center">Recipe: {batch.recipe.title}</h4>
        <h5 className="text-center">{batch.recipe.sweetness} {batch.recipe.variety}</h5>
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
              <h5 className="text-center">Approx. ABV: {approxABV}</h5>
            </div>
            <hr></hr>
          </div>
          <div className="row">
            <h5 className="text-center">Ingredients:</h5>
            <IngredientList
              ingredients={batch.ingredients}
            />
          </div>
          <div className="row">
            <div className="columns small-12">
              <h5 id="progress" className="text-center">Progress:</h5>
              <StepList
                steps={completed_steps}
                stepType={"completed-step"}
                />
              <h6>Next Step:</h6>
              <StepList
                steps={current_step}
                buttonText="fa fa-check-square-o"
                handleStepButton={handleStepComplete}
                stepType="normal-step"
                />
              <StepForm
                action={action}
                handleChange={handleChange}
                handleAddStep={handleBranchOff}
                />
            </div>
          </div>
          {saveable}

        </div>
        <div className="small-12 large-6 columns">
          {comparison}
        </div>
      </div>
    </div>
  );
}

export default BatchShow;
