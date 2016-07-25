import React from 'react';

const StepForm = props => {
  return (
    <div className="steps-form">
        <form onSubmit={props.handleAddStep}>
          <div className="row">
            <div className="input-field col s12">
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
          <div className="center">
            <button type="submit" className="waves-light waves-effect btn">New Step</button>
          </div>
        </form>
    </div>

  );
};

export default StepForm;
