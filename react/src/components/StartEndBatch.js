import React from 'react';

const StartEndBatch = props => {

  let start;
  let end;

  if (props.startDate == null) {
    start = <button className="button" onClick={props.startClick}>Start Batch</button>
  } else {
    start = <h6>Start Date: {props.startDate}</h6>
  }

  if (props.endDate == null) {
    end = <button className="button" onClick={props.endClick}>Finish Batch</button>
  } else {
    end = <h6>End Date: {props.endDate}</h6>
  }


  return (
    <div>{start} {end}</div>
  );
};

export default StartEndBatch;
