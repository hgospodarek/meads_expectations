import React from 'react';

const StartEndBatch = props => {

  let end;
  let moment = require('moment');
  let prettyStartDate = moment(props.startDate).format("MMM Do YYYY")

  if (props.endDate == null) {
    end = <h6 onClick={props.endClick}>Finish Batch</h6>
  } else {
    let prettyEndDate = moment(props.endDate).format("MMM Do YYYY")
    end = <h6>Finished: {prettyEndDate}</h6>
  }

  return (
    <div><h6>Start Date: {prettyStartDate}</h6> <span>{end}</span></div>
  );
};

export default StartEndBatch;
