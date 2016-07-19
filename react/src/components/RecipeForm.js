import React from 'react';

const RecipeForm = props => {

  let sweetnesses = ['Sweet', 'Semi-Sweet', 'Dry']

  // let sweetness_options = sweetnesses.map()


  return (
    <div className="row grocery-form">
      <div className="small-12 columns">
        <form onSubmit={props.handleFormSubmit}>
          <div className="input-group">
            <input
              className="input-group-field"
              type="text"
              placeholder="recipe title"
              value={props.title}
              onChange={props.handleTitle}
            />
            <select
              value={props.sweetness}
              onChange={props.handleSweetness}
            >
              <option>Sweet</option>
              <option>Semi-Sweet</option>
              <option>Dry</option>
            </select>
            <input
              className="input-group-field"
              type="select"
              value={props.variety}
              onChange={props.handleVariety}
            />
            <div className="input-group-button">
              <input type="submit" className="button" value="Submit Recipe" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipeForm;

// eturn (
//     <div className="row grocery-list">
//       <div className="small-11 small-centered columns">
//         <ul>
//           {groceries}
//         </ul>
