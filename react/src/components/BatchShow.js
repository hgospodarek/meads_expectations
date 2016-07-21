import React, { Component } from 'react';
// import BatchList from './BatchList'
import IngredientForm from './IngredientForm'
import StartEndBatch from './StartEndBatch'
import StepList from './StepList'
import StepForm from './StepForm'

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
      description: '',
      notes: '',
      completed_steps: null,
      steps: null,
      action: '',
      branched: false,
    }

    this.loadBatch = this.loadBatch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleEndClick = this.handleEndClick.bind(this);
    this.updateBatch = this.updateBatch.bind(this);
    this.handleStepComplete = this.handleStepComplete.bind(this);
    this.handleBranchOff = this.handleBranchOff.bind(this);
    this.createStep = this.createStep.bind(this);

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
        startDate: data.batch.start_date,
        endDate: data.batch.end_date,
        initialHydrometer: data.batch.initial_hydrometer,
        finalHydrometer: data.batch.final_hydrometer,
        approxABV: data.batch.approx_abv,
        current_step: [data.batch.current_step],
        description: data.batch.description,
        notes: data.batch.notes,
        completed_steps: data.batch.completed_steps,
        steps: data.batch.steps,
        recipe: data.batch.recipe
      })
    })
    .error(data => {
      alert('WHAAT')
    })
  }

  handleChange(e){
    let nextState = {}
    nextState[e.target.name] = e.target.value
    this.setState(nextState)
  }

  handleStartClick() {
    event.preventDefault();
    let newDate = new Date();
    this.setState({startDate: newDate})
    let jstring = JSON.stringify({
      "batch": {"start_date": newDate}
    })
    this.updateBatch(jstring)
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
    let next_step_num = this.state.current_step[0]['step_num'] + 1
    $.ajax({
      method: "POST",
      url: "/api/batches/:batch_id/steps",
      contentType: "application/json",
      data: JSON.stringify({
        step: {
          action: this.state.action,
          step_num: next_step_num,
          batch_id: this.state.id
        }
      })
    })
    .done(data => {
      alert(data)
    })
  }

  removeStepsAhead() {
    let stepsAhead = this.state.steps.filter(item => item.step_num >= current_step[0]['step_num'])
    for(let step of stepsAhead) {
      $.ajax({
        method: "Delete",
        url: "/api/batches/" + this.state.id + "/steps/" + step.id
      })
      .done(data => {
        alert(data)
      })
    }
    })
  }

  handleBranchOff() {
    event.preventDefault()
    this.removeStepsAhead();
    this.createStep();
    this.setState({branched: true, action: ''})
    this.loadBatch();
  }

  // handleAddStep(event){
  //   event.preventDefault();
  //   let updated_steps = this.state.steps
  //   let addedStep = {id: this.state.tempId, action: this.state.action }
  //
  //   let new_temp_id = this.state.tempId + 1
  //   updated_steps.push(addedStep)
  //   this.setState({ steps: updated_steps, tempId: new_temp_id, action: ''});
  // }


  render() {
    let conditionalDiv;
    if (this.state.branched == false) {
      conditionalDiv = <div>
      <h6>Next Step:</h6>
      <StepList
        steps={this.state.current_step}
        buttonText="Complete"
        handleStepButton={this.handleStepComplete}
        yesButton={true}
        />
      </div>

    }
    return(
      <div className="react-batch-row">
        <StartEndBatch
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          startClick={this.handleStartClick}
          endClick={this.handleEndClick}
          />
        <h6>Progress:</h6>
        <StepList
          steps={this.state.completed_steps}
          buttonText="Complete"
          handleStepButton={this.handleStepComplete}
          />
        {conditionalDiv}
          <StepForm
            action={this.state.action}
            handleChange={this.handleChange}
            handleAddStep={this.handleBranchOff}
            />
        </div>
    )
  };
}
export default BatchShow;
// <div className="batch-index-left small-12">
//   <h3>Batch Info</h3>
//   <h6>Description:</h6>
//   <p>{this.state.description}</p>
//   <p>Initial hydrometer reading: {this.state.initial_hydrometer}</p>
//   <p>Final hydrometer reading: {this.state.final_hydrometer}</p>
// </div>
