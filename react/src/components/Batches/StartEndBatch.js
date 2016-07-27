import React from 'react';
import moment from 'moment';

const StartEndBatch = props => {

  let end;
  let prettyStartDate = moment(props.startDate).format("D MMM YYYY")

  if (props.endDate == null) {
    end = <button className="button large" onClick={props.endClick}>Finish Batch</button>
  } else {
    let prettyEndDate = moment(props.endDate).format("D MMM YYYY")
    end = <span>Finished: {prettyEndDate}</span>
  }

  return (
      <h4 className="text-center">Started: {prettyStartDate} {end}</h4>
  );
};

export default StartEndBatch;
