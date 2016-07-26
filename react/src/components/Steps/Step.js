import React from 'react';

const Step = props => {
  let maybebutton;
  let completeDate;
  let moment = require('moment');
  let id = `step-${props.id}`

  if(props.completed == true) {
    completeDate = moment(props.updated).format("D MMM, h:mm a")
  }

  if(props.buttonText) {
    maybebutton =  <i id="step-button" className={props.buttonText} aria-hidden="true" onClick={props.handleStepButton}></i>
  }

  return (
    <div id={id} className="step callout small">
      <div className="row">
        <div className="columns small-11">
          <li>
            <span className={props.stepType}>
              {props.action}
            </span>
            <p>{completeDate}</p>
          </li>
        </div>
        <div className="columns small-1 text-center">
          {maybebutton}
        </div>
      </div>
    </div>
  );
};

export default Step;
