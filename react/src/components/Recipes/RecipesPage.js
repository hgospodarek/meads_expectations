import React, { Component } from 'react';
import RecipeForm from './RecipeForm'
import IngredientForm from '../Ingredients/IngredientForm'
import IngredientList from '../Ingredients/IngredientList'
import StepForm from '../Steps/StepForm'
import StepList from '../Steps/StepList'
import RecipeList from './RecipeList'

class RecipesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      title: '',
      sweetness: 'Semi-Sweet',
      variety: 'Mead',
      ingredients: [],
      ingredient: '',
      steps: [],
      amount: 0.0,
      unit: '',
      tempId: 1,
      action: '',
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddIngredient = this.handleAddIngredient.bind(this);
    this.handleAddStep = this.handleAddStep.bind(this);
    this.handleIngredientDelete = this.handleIngredientDelete.bind(this);
    this.handleStepDelete = this.handleStepDelete.bind(this);
    this.loadRecipes = this.loadRecipes.bind(this);

  }
  componentDidMount(){
    this.loadRecipes();
  }

  loadRecipes(){
    $.ajax({
      url: "/api/recipes",
      contentType: "application/json"
    })
    .success(data => {
      this.setState({recipes: data.recipes});
    })
    .error(data => {
      alert('oh god something went wrong')
    });
  }

  handleChange(e){
    let nextState = {}
    nextState[e.target.name] = e.target.value
    this.setState(nextState)
  }

  handleAddIngredient(event){
    event.preventDefault();
    let updated_ingredients = this.state.ingredients
    let addedIngredient = {id: this.state.tempId, name: this.state.ingredient, unit: this.state.unit, amount: Number.parseFloat(this.state.amount) }

    let new_temp_id = this.state.tempId + 1
    updated_ingredients.push(addedIngredient)
    this.setState({ ingredients: updated_ingredients, tempId: new_temp_id, ingredient: '', unit: '', amount: 0.0 });
  }

  handleAddStep(event){
    event.preventDefault();
    let updated_steps = this.state.steps
    let addedStep = {id: this.state.tempId, action: this.state.action }

    let new_temp_id = this.state.tempId + 1
    updated_steps.push(addedStep)
    this.setState({ steps: updated_steps, tempId: new_temp_id, action: ''});
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

    })
    .success(data => {
      this.loadRecipes();
      this.setState({title: '', ingredients: [], steps: []})
    })
    .error(data => {
      for (let error of data.responseJSON.errors) {
        alert(error)
      }
    })
  };

  handleIngredientDelete(id) {
    event.preventDefault();
    let newIngredients = this.state.ingredients.filter(item => item.id != id)
    this.setState({ingredients: newIngredients})
  };

  handleStepDelete(id) {
    event.preventDefault();
    let newSteps = this.state.steps.filter(item => item.id != id)
    this.setState({steps: newSteps})
  };

  render() {
    return(
      <div className="row column">
        <div className="react-recipes row">
          <div className="recipes-index-left small-12 medium-3 medium-offset-1 columns">
            <h3 className="text-center">Recipes</h3>
            <RecipeList
              recipes={this.state.recipes}
              />
          </div>
          <div className="recipes-index-right small-12 medium-6 columns">
            <h3 className="text-center">New Recipe</h3>
            <div className="section">
              <RecipeForm
                handleFormSubmit={this.handleFormSubmit}
                handleChange={this.handleChange}
                title={this.state.title}
                sweetness={this.state.sweetness}
                variety={this.state.variety}
                />
            </div>
            <hr></hr>
              <div className="ingredients-section">
                <IngredientList
                  ingredients={this.state.ingredients}
                  handleIngredientDelete={this.handleIngredientDelete}
                  />
                <IngredientForm
                  ingredient={this.state.ingredient}
                  unit={this.state.unit}
                  amount={this.state.amount}
                  handleAddIngredient={this.handleAddIngredient}
                  handleChange={this.handleChange}
                  />
              </div>
              <div className="steps-section">
                <StepList
                  steps={this.state.steps}
                  buttonText="fa fa-trash-o"
                  handleStepButton={this.handleStepDelete}
                  stepType={"normal-step"}
                  />
                <StepForm
                  action={this.state.action}
                  handleChange={this.handleChange}
                  handleAddStep={this.handleAddStep}
                  />
              </div>
          </div>
        </div>
      </div>
    )
  }
}
export default RecipesPage;
