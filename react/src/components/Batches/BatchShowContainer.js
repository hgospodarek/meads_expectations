import React, { Component } from 'react';
import BatchShow from './BatchShow';

class BatchShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: `${props.id}`,
      startDate: null,
      endDate: null,
      initialHydrometer: null,
      finalHydrometer: null,
      approxABV: null,
      current_step: null,
      completed_steps: null,
      steps: null,
      action: '',
      variation: null,
      hydrometerField: '',
      newTitle: '',
      batch: null,
      successCount: null,
      failureCount: null
    }

    this.loadBatch = this.loadBatch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEndClick = this.handleEndClick.bind(this);
    this.updateBatch = this.updateBatch.bind(this);
    this.handleStepComplete = this.handleStepComplete.bind(this);
    this.handleBranchOff = this.handleBranchOff.bind(this);
    this.createStep = this.createStep.bind(this);
    this.removeStepsAhead = this.removeStepsAhead.bind(this);
    this.handleHydrometer = this.handleHydrometer.bind(this);
    this.handleSaveAsRecipe = this.handleSaveAsRecipe.bind(this);
    this.handleRecipeSuccess = this.handleRecipeSuccess.bind(this);
    this.handleRecipeFailure = this.handleRecipeFailure.bind(this);
    this.updateRecipe = this.updateRecipe.bind(this);
  }

  componentDidMount(){
    this.loadBatch();
  }

  loadBatch(){
    $.ajax({
      url: "/api/v1/batches/" + this.state.id,
      contentType: "application/json"
    })
    .success(data => {
      this.setState({
        startDate: data.batch.created_at,
        endDate: data.batch.end_date,
        initialHydrometer: data.batch.initial_hydrometer,
        finalHydrometer: data.batch.final_hydrometer,
        approxABV: data.batch.approx_abv,
        current_step: [data.batch.current_step],
        completed_steps: data.batch.completed_steps,
        steps: data.batch.steps,
        recipe: data.batch.recipe,
        variation: data.batch.variation,
        batch: data.batch,
        successCount: data.batch.recipe.success_count,
        failureCount: data.batch.recipe.failure_count
      })
    })
  }

  handleChange(e){
    let nextState = {}
    nextState[e.target.name] = e.target.value
    this.setState(nextState)
  }

  handleEndClick() {
    event.preventDefault();

    let nextBatch = this.state.batch
    nextBatch.end_date = new Date();
    this.setState({batch: nextBatch})

    let jstring = JSON.stringify({
      batch: this.state.batch
    })
    this.updateBatch(jstring)
  }

  updateBatch(jstring) {
    $.ajax({
      method: "Patch",
      url: "/api/v1/batches/" + this.state.id,
      contentType: "application/json",
      data: jstring
    })
    .done(data => {
      this.loadBatch();
    })
  }

  handleStepComplete(id) {
    event.preventDefault();
    let completedStep = this.state.steps.filter(item => item.id === id)
    completedStep[0]['completed?'] = true

    let newSteps = this.state.steps.filter(item => item.id !== id)
    newSteps.push(completedStep)
    this.setState({steps: newSteps})

    let jstring = JSON.stringify({
      "batch": {"steps_attributes": this.state.steps}
    })
    this.updateBatch(jstring)
  }

  createStep() {
    $.ajax({
      method: "POST",
      url: "/api/v1/batches/:batch_id/steps",
      contentType: "application/json",
      data: JSON.stringify({
        step: {
          action: this.state.action,
          batch_id: this.state.id
        }
      })
    })
    .done(data => {
      this.loadBatch();
    })
  }

  removeStepsAhead() {
    let stepsAhead = this.state.steps.filter(item => item['completed?'] === false);

    for (let step of stepsAhead) {
      $.ajax({
        method: "Delete",
        url: "/api/v1/batches/" + this.state.id + "/steps/" + step.id
      })
      .done(data => {
      });
    }
  }

  handleBranchOff() {
    event.preventDefault()
    if (this.state.variation !== true) {
      let jstring = JSON.stringify({"batch": {"variation": true}})
      this.updateBatch(jstring)
      this.setState({ variation: true })
      this.removeStepsAhead();
    }
    this.createStep();
    this.setState({action: ''})
    this.loadBatch();
  }

  handleHydrometer(attr_name) {
    event.preventDefault();
    let obj = {};
    obj[attr_name] = this.state.hydrometerField;

    let jstring = JSON.stringify({
      "batch": obj
    })
    this.setState({hydrometerField: ''})
    this.updateBatch(jstring)
  }

  handleSaveAsRecipe(event) {
    event.preventDefault();
    let recipe_ingredients = [];
    let recipe_steps = []

    for(let ingredient of this.state.batch.ingredients) {
      delete ingredient.id
      delete ingredient.batch_id
      recipe_ingredients.push(ingredient)
    }

    for (let step of this.state.batch.steps) {
      let obj = {}
      obj['action'] = step.action
      recipe_steps.push(obj)
    }

    let jstring = JSON.stringify({
      "recipe": {
        "title": this.state.newTitle,
        "sweetness": this.state.batch.recipe.sweetness,
        "variety": this.state.batch.recipe.variety,
        "ingredients_attributes": recipe_ingredients,
        "steps_attributes": recipe_steps,
        "success_count": 1
      }
    });

    $.ajax({
      method: "POST",
      url:"/api/v1/recipes",
      contentType: "application/json",
      data: jstring

    })
    .success(data => {
      this.loadBatch();
      this.setState({newTitle: ''})
      alert('Saved as a new recipe')
    })
    .error(data => {
      for (let error of data.responseJSON.errors) {
        alert('Something went wrong')
      }
    })
  }

  updateRecipe(jstring) {
    $.ajax({
      method: "Patch",
      url: "/api/v1/recipes/" + this.state.batch.recipe.id,
      contentType: "application/json",
      data: jstring
    })
    .done(data => {
      this.loadBatch();
      alert('Recipe chart updated!')
    })
  }

  handleRecipeSuccess(event) {
    event.preventDefault();
    let newSuccessCount = this.state.successCount + 1;
    let jstring = JSON.stringify({
      "recipe": { "success_count": newSuccessCount }
    });
    this.updateRecipe(jstring)
  }

  handleRecipeFailure(event) {
    event.preventDefault();
    let newFailureCount = this.state.failureCount + 1;
    let jstring = JSON.stringify({
      "recipe": { "failure_count": newFailureCount }
    });
    this.updateRecipe(jstring)
  }

  render() {
    return (
      <BatchShow
        handleBranchOff={this.handleBranchOff}
        handleChange={this.handleChange}
        handleEndClick={this.handleEndClick}
        handleHydrometer={this.handleHydrometer}
        handleRecipeFailure={this.handleRecipeFailure}
        handleRecipeSuccess={this.handleRecipeSuccess}
        handleSaveAsRecipe={this.handleSaveAsRecipe}
        handleStepComplete={this.handleStepComplete}
        {...this.state}
      />
    );
  };
}
export default BatchShowContainer;
