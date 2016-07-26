import React from 'react';

const Hydrometer = props => {
  let hydrometer;
  let onHydroForm = () => props.formSubmit(props.modelAttr);

  if (props.reading == null) {
    hydrometer =  <div className="hydrometer-form">
    <form onSubmit={onHydroForm}>
      <div className="row">
        <div className="columns small-12 medium-8">
          <label htmlFor={props.name} className="text-right middle">{props.label}</label>
        </div>
        <div className="columns small-12 medium-4">
          <input
            id={props.name}
            type="number"
            name={props.name}
            placeholder="0.000"
            min="0.0"
            step="0.001"
            value={props.hydrometerField}
            onChange={props.handleChange}
            required={true}
            />
        </div>
      </div>
        <div className="text-center">
          <input type="submit" className="button" value="Record Reading" />
        </div>
    </form>
    </div>

  } else {
    hydrometer = <span>{props.label}: {props.reading}</span>
  }

  return (
    <p className="hydrometer-form">
      {hydrometer}
    </p>

  );
};

export default Hydrometer;
