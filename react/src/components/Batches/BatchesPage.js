import React, { Component } from 'react';
import BatchList from './BatchList';
import BatchesForm from './BatchesForm';
import BlankCard from '../BlankCard';

class BatchesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      batches: null,
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
      url: "/api/v1/batches",
      contentType: "application/json"
    })
    .success(data => {
      this.setState({batches: data.batches})
    })
  }

  loadRecipes(){
    $.ajax({
      url: "/api/v1/recipes",
      contentType: "application/json"
    })
    .success(data => {
      this.setState({recipes: data.recipes})
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
      url:"/api/v1/batches",
      contentType: "application/json",
      data: jstring

    })
    .success(data => {
      this.loadBatches();
      this.setState({name: ''})
    })
  }

  render() {
    if(this.state.batches === null) {
      return null;
    }

    let batchList;

    if(this.state.batches.length === 0) {
      batchList = <BlankCard
        cardText="batches"
        />
    } else {
      batchList = <BatchList
        batches={this.state.batches}
        />
    }

    return(
      <div className="row column">
        <div className="react-batches row">
          <div className="batches-index-left small-12 large-8 columns">
            <h3 className="text-center">New Batch</h3>
            <BatchesForm
              recipes={this.state.recipes}
              recipe={this.state.recipe}
              name={this.state.name}
              handleChange={this.handleChange}
              handleFormSubmit={this.handleFormSubmit}
              />
          </div>
          <div className="batches-index-right small-12 large-4 columns">
            <h3 className="text-center">Batches</h3>
            {batchList}
          </div>
        </div>
      </div>
    )
  }
}
export default BatchesPage;
