import React from 'react';
import StepList from '../Steps/StepList';

const BatchComparison = props => {

  return (
    <div className="row variation-list">
      <div className="small-12 columns">
        <h4 className="text-center">Batch to Recipe Comparison</h4>
        <h5 className="text-center">Followed Recipe Steps</h5>
        <StepList
          steps={props.completedRecipeSteps}
          stepType={"original-step completed-step"}
          />
      </div>
      <div className="row">
        <h5 className="text-center">Variation</h5>
        <div className="small-6 columns">
          <h6 className="text-center">Recipe-Suggested Steps</h6>
            <StepList
              steps={props.recipeSteps}
              stepType={"original-step"}
              />
        </div>
        <div className="small-6 columns">
          <h6 className="text-center">New Steps</h6>
          <StepList
            steps={props.batchSteps}
            stepType={"new-step"}
            />
        </div>
      </div>

    </div>
  )
}

export default BatchComparison;
