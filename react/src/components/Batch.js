import React from 'react';

const Batch = props => {
  let batchClass = `batch-${props.id}`
  let link = `/batchs/${props.id}`
  return (
    <li className={batchClass}>
      <p><a href={link}>{props.name}</a></p>
      <p>{props.description}</p>
      <p>Start Date: {props.startDate}</p>
      <p>End Date: {props.endDate}</p>
      <p>Recipe: {props.recipe.title}</p>
      <p>Sweetness: {props.recipe.sweetness}</p>
      <p>Variety: {props.recipe.variety}</p>
    </li>
  );
};

export default Batch;
