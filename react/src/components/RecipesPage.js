import React, { Component } from 'react';
import RecipeForm from './RecipeForm'
import IngredientForm from './IngredientForm'
import IngredientList from './IngredientList'
import StepForm from './StepForm'
import StepList from './StepList'
import RecipeList from './RecipeList'

class RecipesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      title: '',
      sweetness: 'Semi-Sweet',
      variety: 'Basic',
      ingredients: [],
      ingredient: '',
      steps: [],
      amount: 0,
      unit: '',
      tempId: 1,
      action: ''
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddIngredient = this.handleAddIngredient.bind(this);
    this.handleAddStep = this.handleAddStep.bind(this);
    this.handleIngredientDelete = this.handleIngredientDelete.bind(this);
    this.handleStepDelete = this.handleStepDelete.bind(this);
    this.loadRecipes = this.loadRecipes.bind(this);

  }

  loadRecipes(){
    $.ajax({
      url: "/api/recipes",
      contentType: "application/json"
    })
    .success(data => {
      this.setState({recipes: data})
    })
  }

  componentDidMount(){
    this.loadRecipes();
  }

  handleChange(e){
    let nextState = {}
    nextState[e.target.name] = e.target.value
    this.setState(nextState)
  }

  handleAddIngredient(event){
    event.preventDefault();
    let updated_ingredients = this.state.ingredients
    let addedIngredient = {id: this.state.tempId, name: this.state.ingredient, unit: this.state.unit, amount: this.state.amount }

    let new_temp_id = this.state.tempId + 1
    updated_ingredients.push(addedIngredient)
    this.setState({ ingredients: updated_ingredients, tempId: new_temp_id, ingredient: '', unit: '', amount: 0 });
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

    })
    .success(data => {
      this.loadRecipes();
      this.setState({title: ''})
    })
    .error(data => {
      alert(data.errors)
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
      <div className="react-recipes row">
        <div className="recipes-index-left small-12 medium-6 columns">
          <h3>Recipes</h3>
          <RecipeList
            recipes={this.state.recipes}
          />
        </div>
        <div className="recipes-index-right small-12 medium-6 columns">
          <h3>New Recipe</h3>
          <div className="react">

          </div>
          <RecipeForm
            handleFormSubmit={this.handleFormSubmit}
            handleChange={this.handleChange}
            title={this.state.title}
            sweetness={this.state.sweetness}
            variety={this.state.variety}
            />
          <div className="react-recipe-form-sub-bits row">
            <div className="ingredients-sub-bit small-12 medium-6 columns">
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
            <div className="steps-sub-bit small-12 medium-6 columns">
              <StepList
                steps={this.state.steps}
                handleStepDelete={this.handleStepDelete}
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