import React from 'react';
import StepList from '../Steps/StepList'
import StepForm from '../Steps/StepForm'

let BatchStepsSection = ({
  action,
  completedSteps,
  currentStep,
  handleBranchOff,
  handleChange,
  handleStepComplete
}) => {
  return(
    <div className="batch-steps-section">
      <h5 id="progress" className="text-center">Progress:</h5>
      <StepList
        steps={completedSteps}
        stepType={"completed-step"}
        />
      <h6>Next Step:</h6>
      <StepList
        steps={currentStep}
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
  );
};

export default BatchStepsSection;
