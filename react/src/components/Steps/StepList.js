import React from 'react';
import Step from './Step';

const StepList = props => {
  let steps = null
  let completed;
  if (props.steps != null && props.steps[0] != null) {
    steps = props.steps.map(step => {
      const { id, action, updated_at } = step;
      completed = step['completed?']

      let onStepButton = () => props.handleStepButton(id);

      return (
        <Step
          key={id}
          id={id}
          action={action}
          handleStepButton={onStepButton}
          buttonText={props.buttonText}
          completed={completed}
          updated={updated_at}
          stepType={props.stepType}
          />
      );
    });
  }

  return (
    <div className="row column step-list">
      <ol>
        {steps}
      </ol>
    </div>
  );
};

export default StepList;
