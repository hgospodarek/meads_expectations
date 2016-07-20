import React from 'react';

const StepForm = props => {
  return (
    <div className="row steps-form">
      <div className="small-12 columns">
        <form onSubmit={props.handleAddStep}>
            <input
              type="text"
              placeholder="action"
              onChange={props.handleAction}
            />
          <input type="submit" className="button" value="Add Step" />
        </form>
      </div>
    </div>

  );
};

export default StepForm;
