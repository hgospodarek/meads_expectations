import React from 'react';

const RecipeForm = props => {

  let sweetnesses = ['Sweet', 'Semi-Sweet', 'Dry']

  let varieties = ['Mead', 'Melomel', 'Braggot', 'Hydromel', 'Pyment', 'Cyser', 'Metheglin', 'Rhodomel', 'Sack Mead', 'Show Mead', 'Great Mead', 'Sparkling Mead', 'Morat', 'Hippocras', 'Omphacomel', 'Oxymel', 'Acerglyn', 'Bochet', 'Capsicumel', 'Black Mead', 'Mulled Mead', 'Tej', 'Acan', 'Gverc', 'Dwojniak', 'Poltorak', 'Czworniak', 'Sima', 'Pitarilla', 'Medica', 'Dandaghare', 'Medovina', 'Medovukha', 'iQhilika']

  let sweetness_options = sweetnesses.map(sweetness => {
    return (
      <option>{sweetness}</option>
    )
  });

  let variety_options = varieties.map(variety => {
    return (
      <option>{variety}</option>
    )
  });

  return (
    <div className="recipe-form">
        <form onSubmit={props.handleFormSubmit}>
          <div className="row">
            <div className="input-field col s12">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                name="title"
                value={props.title}
                onChange={props.handleChange}
                required={true}
                />
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <select
                id="sweetness"
                name="sweetness"
                value={props.sweetness}
                onChange={props.handleChange}
                >
                {sweetness_options}
              </select>
              <label>Sweetness</label>
            </div>
            <div className="input-field col s6">
              <select
                id="variety"
                name="variety"
                value={props.variety}
                onChange={props.handleChange}
                >
                {variety_options}
              </select>
              <label>Variety</label>
            </div>
          </div>
          <div className="center">
            <button type="submit" className="waves-effect waves-light btn">Submit Recipe</button>            
          </div>
        </form>
    </div>
  );
};

export default RecipeForm;
