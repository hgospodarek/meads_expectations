import React from 'react';

const Hydrometer = props => {
  let hydrometer;
  let onHydroForm = () => props.formSubmit(props.modelAttr);

  if (props.reading == null) {
    hydrometer =  <form onSubmit={onHydroForm}>
      <div className="row">
        <div className="input-field s4 col">
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
        </div>
        <div className="s8 col">
          <button type="submit" className="waves-effect waves-light btn">Record Reading</button>
        </div>
      </div>
    </form>

  } else {
    hydrometer = <div class="row">
      <h6 className="s12 col">
        {props.label}: {props.reading}
      </h6>
    </div>
  }

  return (
    <div className="hydrometer-form">
      {hydrometer}
    </div>

  );
};

export default Hydrometer;
