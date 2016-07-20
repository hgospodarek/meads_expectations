import React from 'react';

const Batch = props => {
  let batchClass = `batch-${props.id}`
  let link = `/batchs/${props.id}`
  return (
    <li className={batchClass}>
      <p><a href={link}>{props.name}</a></p>
      <p>{props.description}</p>
      <p>{props.startDate}</p>
      <p>{props.endDate}</p>
      <p>{props.initialHydrometer}</p>
      <p>{props.finalHydrometer}</p>
      <p>{props.approxABV}</p>
      <p>{props.notes}</p>
      <p>{props.createdAt}</p>
      <p>{props.updatedAt}</p>

    </li>
  );
};

export default Batch;
