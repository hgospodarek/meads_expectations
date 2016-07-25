import React from 'react';
import moment from 'moment';

const StartEndBatch = props => {

  let end;
  let prettyStartDate = moment(props.startDate).format("D MMM YYYY")

  if (props.endDate == null) {
    end = <button className="waves-effect waves-light btn" onClick={props.endClick}>Finish Batch</button>
  } else {
    let prettyEndDate = moment(props.endDate).format("D MMM YYYY")
    end = <h6>Finished: {prettyEndDate}</h6>
  }

  return (
      <div className="row">
        <div className="col s6">
          <h6>Started: {prettyStartDate}</h6>
        </div>
        <div className="col s6">
          {end}
        </div>
      </div>
  );
};

export default StartEndBatch;
