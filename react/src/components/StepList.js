import React from 'react';
import Step from './Step';

const StepList = props => {
  let steps = null
  if (props.steps != null) {
    steps = props.steps.map(step => {
      const { id, action } = step;
      let onStepButton = () => props.handleStepButton(id);

      return (
        <Step
          key={id}
          action={action}
          handleStepButton={onStepButton}
          buttonText={props.buttonText}
          />
      );
    });
  }

  return (
    <div className="row step-list">
        <ul>
          {steps}
        </ul>
    </div>
  );
};

export default StepList;
