import React, { Component } from 'react';
import RecipeForm from './RecipeForm'
import IngredientForm from './IngredientForm'
import IngredientList from './IngredientList'
import StepForm from './StepForm'
import StepList from './StepList'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      sweetness: 'Semi-Sweet',
      variety: 'Basic',
      ingredients: [],
      ingredient: '',
      steps: [],
      ingredientNumber: 0,
      unit: '',
      tempId: 1,
      action: ''
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleSweetness = this.handleSweetness.bind(this);
    this.handleVariety = this.handleVariety.bind(this);
    this.handleIngredient = this.handleIngredient.bind(this);
    this.handleAction = this.handleAction.bind(this);
    this.handleAddIngredient = this.handleAddIngredient.bind(this);
    this.handleAddStep = this.handleAddStep.bind(this);
    this.handleIngredientNumber = this.handleIngredientNumber.bind(this);
    this.handleUnit = this.handleUnit.bind(this);
    this.handleIngredientDelete = this.handleIngredientDelete.bind(this);
    this.handleStepDelete = this.handleStepDelete.bind(this);


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

  handleAction(event){
    let newAction = event.target.value;
    this.setState({ action: newAction });
  }

  handleAddIngredient(event){
    event.preventDefault();
    let updated_ingredients = this.state.ingredients
    let addedIngredient = {id: this.state.tempId, name: this.state.ingredient, unit: this.state.unit, amount: this.state.ingredient_number }

    let new_temp_id = this.state.tempId + 1
    updated_ingredients.push(addedIngredient)
    this.setState({ ingredients: updated_ingredients, tempId: new_temp_id, ingredient: '', unit: '', ingredientNumber: 0 });
  }

  handleAddStep(event){
    event.preventDefault();
    let updated_steps = this.state.steps
    let addedStep = {id: this.state.tempId, action: this.state.action }

    let new_temp_id = this.state.tempId + 1
    updated_steps.push(addedStep)
    this.setState({ steps: updated_steps, tempId: new_temp_id, action: ''});
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
    event.preventDefault();
    let recipe_ingredients = [];
    let recipe_steps = []

    for(let ingredient of this.state.ingredients) {
      delete ingredient.id
      recipe_ingredients.push(ingredient)
    }

    for (let i = 0; i < this.state.steps.length; i++) {
      delete this.state.steps[i].id
      this.state.steps[i]['step_num'] = i + 1
      recipe_steps.push(this.state.steps[i])
    }

    let jstring = JSON.stringify({
      "recipe": {
        "title": this.state.title,
        "sweetness": this.state.sweetness,
        "variety": this.state.variety,
        "ingredients_attributes": recipe_ingredients,
        "steps_attributes": recipe_steps
      }
    });

    $.ajax({
      method: "POST",
      url:"/api/recipes",
      contentType: "application/json",
      data: jstring

    });
  };

  handleIngredientDelete(id) {
    event.preventDefault();
    let newIngredients = this.state.ingredients.filter(item => item.id != id)
    this.setState({ingredients: newIngredients})
  };

  handleStepDelete(id) {
    event.preventDefault();
    let newStepss = this.state.steps.filter(item => item.id != id)
    this.setState({steps: newSteps})
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
      <StepList
          steps={this.state.steps}
          handleStepDelete={this.handleStepDelete}
        />
      <StepForm
          action={this.state.action}
          handleAction={this.handleAction}
          handleAddStep={this.handleAddStep}
        />
      </div>
    )
  }
}
export default App;
