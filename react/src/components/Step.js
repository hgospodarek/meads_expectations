import React from 'react';

const Step = props => {

  return (
    <li className="step">
      <span>{props.action}</span>
      <div className="float-right">
        <button className="button" type="button" onClick={props.handleDelete}>Delete</button>
      </div>
    </li>
  );
};

export default Step;
