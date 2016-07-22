import React from 'react';

const Batch = props => {
  let batchClass = `batch-${props.id}`
  let link = `/batches/${props.id}`
  let moment = require('moment');
  let prettyStartDate = moment(props.startDate).format("MMM Do YYYY")
  let prettyEndDate;

  if (props.endDate) {
    prettyEndDate = moment(props.endDate).format("MMM Do YYYY")
  }


  return (
    <li className={batchClass}>
      <p><a href={link}>{props.name}</a></p>
      <p>Start Date: {prettyStartDate}</p>
      <p>End Date: {prettyEndDate}</p>
      <p>Recipe: {props.recipe.title}</p>
      <p>Sweetness: {props.recipe.sweetness}</p>
      <p>Variety: {props.recipe.variety}</p>
    </li>
  );
};

export default Batch;
