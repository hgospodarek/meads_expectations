import React from 'react';

const StartEndBatch = props => {

  let end;
  let moment = require('moment');
  let prettyStartDate = moment(props.startDate).format("MMM Do YYYY")

  if (props.endDate == null) {
    end = <button className="button" onClick={props.endClick}>Finish Batch</button>
  } else {
    let prettyEndDate = moment(props.endDate).format("MMM Do YYYY")
    end = <span>Finished: {prettyEndDate}</span>
  }

  return (
      <h4 className="text-center">Started: {prettyStartDate} {end}</h4>
  );
};

export default StartEndBatch;
