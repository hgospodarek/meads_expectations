import React from 'react';

const StepForm = props => {
  return (
    <div className="steps-form">
      <form onSubmit={props.handleAddStep}>
        <div className="row">
          <div className="columns small-12">
            <label htmlFor="action">Step</label>
            <input
              id="action"
              type="text"
              name="action"
              placeholder="step"
              value={props.action}
              onChange={props.handleChange}
              required={true}
              />
          </div>
        </div>
        <div className="text-center">
          <input type="submit" className="button" value="New Step" />
        </div>
      </form>
    </div>
  );
};

export default StepForm;
