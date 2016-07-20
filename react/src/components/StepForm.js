import React from 'react';

const StepForm = props => {
  return (
    <div className="row steps-form">
        <form onSubmit={props.handleAddStep}>
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
          <input type="submit" className="button" value="Add Step" />
        </form>
    </div>

  );
};

export default StepForm;
