import React from 'react';
import Step from './Step';

const StepList = props => {
  let steps = props.steps.map(step => {
    const { id, action } = step;
    let onDelete = () => props.handleStepDelete(id);

    return (
      <Step
        key={id}
        action={action}
        handleDelete={onDelete}
      />
    );
  });

  return (
    <div className="row step-list">
        <ul>
          {steps}
        </ul>
    </div>
  );
};

export default StepList;