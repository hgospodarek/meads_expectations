import React from 'react';
import StepList from '../Steps/StepList';

const BatchComparison = props => {

  return (
    <div className="row">
      <div className="small-12 columns">
        <h5>Batch to Recipe Comparison</h5>
        <h6>Followed Recipe Steps Steps</h6>
        <StepList
          steps={props.completedRecipeSteps}
          stepType={"original-step completed-step"}
          />
      </div>
      <div className="row">
        <h6>Variation</h6>
        <div className="small-6 columns">
          <h6>Recipe-Suggested Steps</h6>
            <StepList
              steps={props.recipeSteps}
              stepType={"original-step"}
              />
        </div>
        <div className="small-6 columns">
          <h6>New Steps</h6>
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
