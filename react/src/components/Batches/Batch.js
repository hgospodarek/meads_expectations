import React from 'react';
import moment from 'moment';

const Batch = props => {
  // let batchClass = `batch-${props.id}`
  let link = `/batches/${props.id}`
  let prettyStartDate = moment(props.startDate).format("D MMM YYYY")
  let prettyEndDate;

  if (props.endDate) {
    prettyEndDate = moment(props.endDate).format("D MMM YYYY")
  }
  
  return (
    <a href={link}>
      <div className="callout small">
        <p className="main-text-color">{props.name}</p>
        <p>Start Date: {prettyStartDate}</p>
        <p>End Date: {prettyEndDate}</p>
        <p>Recipe: {props.recipe.title}</p>
        <p>Sweetness: {props.recipe.sweetness}</p>
        <p>Variety: {props.recipe.variety}</p>
      </div>
    </a>
  );
};

export default Batch;
