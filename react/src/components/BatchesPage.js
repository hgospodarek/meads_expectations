import React, { Component } from 'react';
import BatchList from './BatchList'
import BatchesForm from './BatchesForm'

class BatchesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      batches: [],
      recipes: [],
      name: '',
      recipe: ''
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.loadBatches = this.loadBatches.bind(this);
    this.loadRecipes = this.loadRecipes.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }
  loadBatches(){
    $.ajax({
      url: "/api/batches",
      contentType: "application/json"
    })
    .success(data => {
      this.setState({batches: data.batches})
    })
  }

  loadRecipes(){
    $.ajax({
      url: "/api/recipes",
      contentType: "application/json"
    })
    .success(data => {
      this.setState({recipes: data.recipes})
    })
    .error(data => {
      Materialize.toast(data, 4000)
    })
  }

  componentDidMount(){
    this.loadBatches();
    this.loadRecipes();
  }

  handleChange(e){
    let nextState = {}
    nextState[e.target.name] = e.target.value
    this.setState(nextState)
  }

  handleFormSubmit(event) {
    event.preventDefault();

    let jstring = JSON.stringify({
      "batch": {
        "name": this.state.name,
        "recipe": this.state.recipe
      }
    });

    $.ajax({
      method: "POST",
      url:"/api/batches",
      contentType: "application/json",
      data: jstring

    })
    .success(data => {
      this.loadBatches();
      this.setState({name: ''})
    })
    .error(data => {
      alert(data.batch.errors)
    })
  };

  render() {
    return(
      <div className="react-batches container">
        <div className="row">
          <div className="batches-index-left s12 m6 col">
            <h3 className="center">Batches</h3>
            <BatchList
              batches={this.state.batches}
              />
          </div>
          <div className="batches-index-right s12 m6 col">
            <h3 className="center">New Batch</h3>
            <BatchesForm
              recipes={this.state.recipes}
              recipe={this.state.recipe}
              name={this.state.name}
              handleChange={this.handleChange}
              handleFormSubmit={this.handleFormSubmit}
              />
          </div>
        </div>
      </div>
    )
  }
}
export default BatchesPage;
