import React from 'react';

const StepForm = props => {
  return (
    <div className="row steps-form">
        <form onSubmit={props.handleAddStep}>
          <label htmlFor="step">Step</label>
            <input
              id="step"
              type="text"
              name="step"
              placeholder="step"
              value={props.step}
              onChange={props.handleChange}
              required={true}
            />
          <input type="submit" className="button" value="Add Step" />
        </form>
    </div>

  );
};

export default StepForm;
