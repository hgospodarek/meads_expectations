import React from 'react';

const RecipeForm = props => {

  let sweetnesses = ['Dry', 'Semi-Sweet', 'Sweet']

  let varieties = ['Mead', 'Melomel', 'Braggot', 'Hydromel', 'Pyment', 'Cyser', 'Metheglin', 'Rhodomel', 'Sack Mead', 'Show Mead', 'Great Mead', 'Sparkling Mead', 'Morat', 'Hippocras', 'Omphacomel', 'Oxymel', 'Acerglyn', 'Bochet', 'Capsicumel', 'Black Mead', 'Mulled Mead', 'Tej', 'Acan', 'Gverc', 'Dwojniak', 'Poltorak', 'Czworniak', 'Sima', 'Pitarilla', 'Medica', 'Dandaghare', 'Medovina', 'Medovukha', 'iQhilika']

  let sweetness_options = sweetnesses.map(sweetness => {
    return (
      <option>{sweetness}</option>
    )
  });

  let variety_options = varieties.sort().map(variety => {
    return (
      <option>{variety}</option>
    )
  });

  return (
    <div className="recipe-form form-container">
        <form onSubmit={props.handleFormSubmit}>
          <div className="row">
            <div className="columns small-12">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                name="title"
                placeholder="Happy Meadium"
                value={props.title}
                onChange={props.handleChange}
                required={true}
                />
            </div>
          </div>
          <div className="row">
            <div className="columns small-6">
              <label htmlFor="sweetness">Sweetness</label>
              <select
                id="sweetness"
                name="sweetness"
                value={props.sweetness}
                onChange={props.handleChange}
                >
                {sweetness_options}
              </select>
            </div>
            <div className="columns small-6">
              <label htmlFor="variety">Variety</label>
              <select
                id="variety"
                name="variety"
                value={props.variety}
                onChange={props.handleChange}
                >
                {variety_options}
              </select>
            </div>
          </div>
          <div className="text-center">
            <input type="submit" className="button large" value="Save Recipe" />
          </div>
        </form>
    </div>
  );
};

export default RecipeForm;
