import React from 'react';
import Batch from './Batch';

const BatchList = props => {
  let batches = props.batches.map(batch => {
    const { id, name, recipe, description, start_date, end_date, initial_hydrometer, final_hydrometer, approx_abv, notes, created_at, updated_at } = batch;

    return (
      <Batch
        key={id}
        id={id}
        name={name}
        recipe={recipe}
        description={description}
        startDate={start_date}
        endDate={end_date}
        initialHydrometer={initial_hydrometer}
        finalHydrometer={final_hydrometer}
        approxABV={approx_abv}
        notes={notes}
        createdAt={created_at}
        updatedAt={updated_at}
      />
    );
  });

  return (
    <div className="batch-list">
        <ul>
          {batches}
        </ul>
    </div>
  );
};

export default BatchList;
