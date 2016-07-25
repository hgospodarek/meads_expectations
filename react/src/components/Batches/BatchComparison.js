import React from 'react';
import StepList from '../Steps/StepList';

const BatchComparison = props => {

  return (
    <div className="row">
      <div className="small-6 columns">
        <StepList
          steps={props.recipeSteps}
          />
      </div>
      <div className="small-6 columns">
        <StepList
          steps={props.batchSteps}
          />
      </div>

    </div>
  )
}

export default BatchComparison;
