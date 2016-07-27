import React, { Component } from 'react';
import RecipeShow from './RecipeShow';

class RecipeShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: `${props.id}`,
      editing: false,
      sweetness: null;
      variety: null,
      ingredients: [],
      ingredient: '',
      steps: [],
      amount: 0.0,
      unit: '',
      action: '',
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddIngredient = this.handleAddIngredient.bind(this);
    this.createStep = this.createStep.bind(this);
    this.handleIngredientDelete = this.handleIngredientDelete.bind(this);
    this.handleStepDelete = this.handleStepDelete.bind(this);
    this.loadRecipe = this.loadRecipe.bind(this);
    this.setEditing = this.setEditing.bind(this);
  }

  componentDidMount(){
    this.loadRecipe();
  }

  loadRecipe(){
    $.ajax({
      url: "/api/v1/recipes" + this.state.id,
      contentType: "application/json"
    })
    .success(data => {
      this.setState({
        sweetness: data.recipe.sweetness,
        variety: data.recipe.variety,
        ingredients: data.recipe.ingredients,
        steps: data.recipe.steps
      });
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

  createStep() {
    $.ajax({
      method: "POST",
      url: "/api/v1/batches/:recipe_id/steps",
      contentType: "application/json",
      data: JSON.stringify({
        step: {
          action: this.state.action,
          recipe_id: this.state.id
        }
      })
    })
    .done(data => {
      this.loadRecipe();
    })
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
      url:"/api/v1/recipes",
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

}
