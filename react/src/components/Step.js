import React from 'react';

const Step = props => {
  let maybebutton;
  let stepClass;
  let completeDate;
  let moment = require('moment');
  let id = `step-${props.id}`

  if(props.completed == true) {
    stepClass = "strikethrough";
    completeDate = moment(props.updated).format("D MMM, h:mm a")
  } else {
    stepClass = "step"
  }

  if(props.yesButton == true) {
    maybebutton =  <button className="button" type="button" onClick={props.handleStepButton}>{props.buttonText}</button>

  } else {
    maybebutton = <span></span>
  }

  return (
    <li id={id}> <span className={stepClass}>{props.action}</span> {maybebutton}{completeDate}</li>
  );
};

export default Step;
