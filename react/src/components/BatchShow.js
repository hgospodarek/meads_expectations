import React, { Component } from 'react';
// import BatchList from './BatchList'
import IngredientForm from './IngredientForm'

class BatchShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: `${props.id}`,
      batch: ''
    }

    // this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.loadBatch = this.loadBatch.bind(this);
    // this.loadRecipes = this.loadRecipes.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }
  loadBatch(){
    $.ajax({
      url: "/api/batches/" + this.state.id,
      contentType: "application/json"
    })
    .success(data => {
      this.setState({batch: data.batch})
    })
  }

  // loadRecipes(){
  //   $.ajax({
  //     url: "/api/recipes",
  //     contentType: "application/json"
  //   })
  //   .success(data => {
  //     this.setState({recipes: data.recipes})
  //   })
  // }

  componentDidMount(){
    this.loadBatch();
    // this.loadRecipes();
  }

  handleChange(e){
    let nextState = {}
    nextState[e.target.name] = e.target.value
    this.setState(nextState)
  }
  //
  // handleFormSubmit(event) {
  //   event.preventDefault();
  //
  //   let jstring = JSON.stringify({
  //     "batch": {
  //       "name": this.state.name,
  //       "recipe": this.state.recipe,
  //       "description": this.state.description,
  //     }
  //   });
  //
  //   $.ajax({
  //     method: "POST",
  //     url:"/api/batches",
  //     contentType: "application/json",
  //     data: jstring
  //
  //   })
  //   .success(data => {
  //     this.loadBatches();
  //     this.setState({name: '', description: ''})
  //   })
  //   .error(data => {
  //     alert(data.batch.errors)
  //   })
  // };

  render() {
    const { start_date, end_date, initial_hydrometer, final_hydrometer, approx_abv, current_step, description, notes } = this.state.batch;
    return(
      <div className="react-batch-row">
        <div className="batch-index-left small-12">
          <h3>Batch Info</h3>
          <h6>Description:</h6>
          <p>{description}</p>
          <p>Initial hydrometer reading: {initial_hydrometer}</p>
          <p>Final hydrometer reading: {final_hydrometer}</p>
        </div>
      </div>
    )
  };
}
export default BatchShow;
