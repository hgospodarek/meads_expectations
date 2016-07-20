import React from 'react';

const Step = props => {

  return (
    <li className="step"> {props.action} <button className="button" type="button" onClick={props.handleDelete}>Delete</button>
    </li>
  );
};

export default Step;