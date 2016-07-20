import React, { Component } from 'react';
import RecipeForm from './RecipeForm'
import IngredientForm from './IngredientForm'
import IngredientList from './IngredientList'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'title',
      sweetness: 'testing',
      variety: 'variety',
      ingredients: [],
      ingredient: '',
      steps: [],
      ingredientNumber: 0,
      unit: '',
      tempId: 1
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleSweetness = this.handleSweetness.bind(this);
    this.handleVariety = this.handleVariety.bind(this);
    this.handleIngredient = this.handleIngredient.bind(this);
    this.handleSteps = this.handleSteps.bind(this);
    this.handleAddIngredient = this.handleAddIngredient.bind(this);
    this.handleAddStep = this.handleAddStep.bind(this);
    this.handleIngredientNumber = this.handleIngredientNumber.bind(this);
    this.handleUnit = this.handleUnit.bind(this);
    this.handleIngredientDelete = this.handleIngredientDelete.bind(this)

  }

  handleTitle(event){
    let newTitle = event.target.value;
    this.setState({ title: newTitle });
  }

  handleSweetness(event){
    let newSweetness = event.target.value;
    this.setState({ sweetness: newSweetness });
  }

  handleVariety(event){
    let newVariety = event.target.value;
    this.setState({ variety: newVariety });
  }

  handleIngredient(event){
    let newIngredient = event.target.value;
    this.setState({ ingredient: newIngredient });
  }

  handleSteps(event){
    let newSteps = event.target.value;
    this.setState({ steps: newSteps });
  }

  handleAddIngredient(event){
    event.preventDefault();
    let updated_ingredients = this.state.ingredients
    let addedIngredient = {id: this.state.tempId, name: this.state.ingredient, unit: this.state.unit, amount: this.state.ingredient_number }

    let new_temp_id = this.state.tempId + 1
    updated_ingredients.push(addedIngredient)
    this.setState({ ingredients: updated_ingredients, tempId: new_temp_id });
  }

  handleAddStep(event){
    let newAddStep = event.target.value;
    this.setState({ steps: newAddStep });
  }

  handleIngredientNumber(event){

    let newIngredientNumber = event.target.value;
    this.setState({ ingredient_number: newIngredientNumber });
  }

  handleUnit(event){
    let newUnit = event.target.value;
    this.setState({ unit: newUnit });
  }

  handleFormSubmit(event) {
    debugger;
    event.preventDefault();
    $.ajax({
      method: "POST",
      url:"/api/recipes",
      contentType: "application/json",
      data: JSON.stringify({ "recipe": {
        "title": this.state.name,
        "sweetness": this.state.date,
        "variety": this.state.city,
      } })

    });
  };

  handleIngredientDelete(id) {
    event.preventDefault();
    let newIngredients = this.state.ingredients.filter(item => item.id != id)
    this.setState({ingredients: newIngredients})
  };


  render() {
    return(
      <div className="react-recipe-form">
        <h3>New Recipe</h3>
        <RecipeForm
          handleFormSubmit={this.handleFormSubmit}
          handleTitle={this.handleTitle}
          handleSweetness={this.handleSweetness}
          handleVariety={this.handleVariety}
          title={this.state.title}
          sweetness={this.state.sweetness}
          variety={this.state.variety}
          steps={this.state.steps}
          handleAddStep={this.handleAddStep}
          />
        <IngredientList
          ingredients={this.state.ingredients}
          handleIngredientDelete={this.handleIngredientDelete}
        />
        <IngredientForm
          ingredient={this.state.ingredient}
          unit={this.state.unit}
          ingredientNumber={this.props.ingredientNumber}
          handleIngredient={this.handleIngredient}
          handleAddIngredient={this.handleAddIngredient}
          handleIngredientNumber={this.handleIngredientNumber}
          handleUnit={this.handleUnit}
        />

      </div>
    )
  }
}
export default App;
