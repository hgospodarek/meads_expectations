import React, { Component } from 'react';
// import BatchList from './BatchList'
import IngredientForm from './IngredientForm'
import StartEndBatch from './StartEndBatch'

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
      notes: ''
    }

    this.loadBatch = this.loadBatch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleEndClick = this.handleEndClick.bind(this);
    this.updateBatch = this.updateBatch.bind(this);

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
        current_step: data.batch.current_step.action,
        description: data.batch.description,
        notes: data.batch.notes
      })
    })
  }

  componentDidMount(){
    this.loadBatch();
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

  render() {
    return(
      <div className="react-batch-row">
        <div className="batch-index-left small-12">
          <h3>Batch Info</h3>
          <h6>Description:</h6>
          <p>{this.state.description}</p>
          <p>Initial hydrometer reading: {this.state.initial_hydrometer}</p>
          <p>Final hydrometer reading: {this.state.final_hydrometer}</p>
          <StartEndBatch
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            startClick={this.handleStartClick}
            endClick={this.handleEndClick}
          />
        </div>
      </div>
    )
  };
}
export default BatchShow;
