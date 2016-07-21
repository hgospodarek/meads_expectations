import React from 'react';

const StartEndBatch = props => {

  let start;
  let end;

  if (props.startDate == null) {
    start = <h6 onClick={props.startClick}>Start Batch</h6>
  } else {
    start = <h6>Started: {props.startDate}</h6>
  }

  if (props.endDate == null) {
    end = <h6 onClick={props.endClick}>Finish Batch</h6>
  } else {
    end = <h6>Finished: {props.endDate}</h6>
  }


  return (
    <div><span>{start}</span> <span>{end}</span></div>
  );
};

export default StartEndBatch;
