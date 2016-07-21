import React from 'react';

const Step = props => {
  let maybebutton;
  let stepClass;

  if(props.completed == true) {
    stepClass = "strikethrough"
  } else {
    stepClass = "step"
  }

  if(props.yesButton == true) {
    maybebutton =  <button className="button" type="button" onClick={props.handleStepButton} >{props.buttonText}</button>

  } else {
    maybebutton = <span></span>
  }

  return (
    <li className={stepClass}> {props.action} {maybebutton}
    </li>
  );
};

export default Step;
