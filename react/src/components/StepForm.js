import React from 'react';

const StepForm = props => {
  return (
    <div className="small-12 medium-6 columns steps-form">
        <form onSubmit={props.handleAddStep}>
            <input
              type="text"
              name="action"
              placeholder="action"
              value={props.action}
              onChange={props.handleChange}
            />
          <input type="submit" className="button" value="Add Step" />
        </form>
    </div>

  );
};

export default StepForm;
