import React, { Component } from 'react';
import RecipeList from '../Recipes/RecipeList'
import IngredientForm from '../Ingredients/IngredientForm'
import StartEndBatch from './StartEndBatch'
import StepList from '../Steps/StepList'
import StepForm from '../Steps/StepForm'
import Hydrometer from './Hydrometer'

class BatchShow extends Component {
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
      batch: null
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

  }

  componentDidMount(){
    this.loadBatch();
  }

  loadBatch(){
    $.ajax({
      url: "/api/batches/" + this.state.id,
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
        batch: data.batch
      })
    })
    .error(data => {
      console.log(data)
    })
  }

  handleChange(e){
    // let nextState = {}
    let nextBatch = this.state.batch
    nextBatch[e.target.name] = e.target.value
    // nextState[e.target.name] = e.target.value
    this.setState(nextState)
  }

  handleEndClick() {
    event.preventDefault();
    let newDate = new Date();
    this.setState({endDate: newDate})
    let jstring = JSON.stringify({
      "batch": {"end_date": newDate}
    })
    this.updateBatch(jstring)
  }

  updateBatch(jstring) {
    $.ajax({
      method: "Patch",
      url: "/api/batches/" + this.state.id,
      contentType: "application/json",
      data: jstring
    })
    .done(data => {
      this.loadBatch();
    })
  }

  handleStepComplete(id) {
    event.preventDefault();
    let completedStep = this.state.steps.filter(item => item.id == id)
    completedStep[0]['completed?'] = true

    let newSteps = this.state.steps.filter(item => item.id !=id)
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
      url: "/api/batches/:batch_id/steps",
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
    let stepsAhead = this.state.steps.filter(item => item['completed?'] == false);

    for (let step of stepsAhead) {
      $.ajax({
        method: "Delete",
        url: "/api/batches/" + this.state.id + "/steps/" + step.id
      })
      .done(data => {
      });
    }
  }

  handleBranchOff() {
    event.preventDefault()
    if (this.state.variation != true) {
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
    debugger;
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
      this.loadBatch();
      this.setState({newTitle: ''})
    })
    .error(data => {
      for (let error of data.responseJSON.errors) {
        alert(error)
      }
    })
  }


  render() {
    let finalHydro;
    let saveable;

    if (this.state.initialHydrometer != null) {
      finalHydro = <Hydrometer
        hydrometerField={this.state.hydrometerField}
        reading={this.state.finalHydrometer}
        name="hydrometerField"
        label="Final Hydrometer Reading"
        modelAttr="final_hydrometer"
        handleChange={this.handleChange}
        formSubmit={this.handleHydrometer}
      />
    }

    if (this.state.endDate != null) {
      saveable = <form onSubmit={this.handleSaveAsRecipe}>
        <input
          id="new recipe"
          type="text"
          name="newTitle"
          placeholder="new recipe title"
          value={this.state.newTitle}
          onChange={this.handleChange}
          required={true}
        />
      <input type="submit" className="button" value="Submit Batch as New Recipe?" />
      </form>
    }
    return(
      <div className="react-batch">
        <StartEndBatch
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          endClick={this.handleEndClick}
          />
          <Hydrometer
            hydrometerField={this.state.hydrometerField}
            reading={this.state.initialHydrometer}
            name="hydrometerField"
            label="Initial Hydrometer Reading"
            modelAttr="initial_hydrometer"
            handleChange={this.handleChange}
            formSubmit={this.handleHydrometer}
          />
        {finalHydro}
        <h5>Approx. ABV: {this.state.approxABV}</h5>
        <h6 id="progress">Progress:</h6>
        <StepList
          steps={this.state.completed_steps}
          buttonText="Complete"
          handleStepButton={this.handleStepComplete}
          />
          <h6>Next Step:</h6>
          <StepList
            steps={this.state.current_step}
            buttonText="Complete"
            handleStepButton={this.handleStepComplete}
            yesButton={true}
            />
          <StepForm
            action={this.state.action}
            handleChange={this.handleChange}
            handleAddStep={this.handleBranchOff}
            />
          {saveable}
        </div>
    )
  };
}
export default BatchShow;
