import React from 'react';

const Hydrometer = props => {
  let hydrometer;
  let onHydroForm = () => props.formSubmit(props.modelAttr);

  if (props.reading == null) {
    hydrometer =  <form onSubmit={onHydroForm}>
      <label htmlFor={props.name}>{props.label}</label>
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
      <input type="submit" className="button" value="Record Reading" />
    </form>

  } else {
    hydrometer = <span>{props.label}: {props.reading}</span>
  }

  return (
    <h5 className="hydrometer-form">
      {hydrometer}
    </h5>

  );
};

export default Hydrometer;
