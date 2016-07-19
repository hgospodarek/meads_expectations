import React, { Component } from 'react';
import RecipeForm from './RecipeForm'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'title',
      sweetness: 'testing',
      variety: 'variety',
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleSweetness = this.handleSweetness.bind(this);
    this.handleVariety = this.handleVariety.bind(this);

  }

  handleTitle(event){
    let newTitle = event.target.value;
    this.setState({ title: newTitle });
  }

  handleSweetness(event){
    let newSweetness = event.target.value;
    this.setState({ sweetness: newSweetness });
  }

  handleVariety(event){
    let newVariety = event.target.value;
    this.setState({ variety: newVariety });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    $.ajax({
      method: "POST",
      url:"/api/recipes",
      contentType: "application/json",
      data: JSON.stringify({ "recipe": {
        "title": this.state.name,
        "sweetness": this.state.date,
        "variety": this.state.city,
      } })

    });
  };


  render() {
    return(
      <div className="react-recipe-form">
        <h3>New Recipe</h3>
        <RecipeForm
          handleFormSubmit={this.handleFormSubmit}
          handleTitle={this.handleTitle}
          handleSweetness={this.handleSweetness}
          handleVariety={this.handleVariety}
          title={this.state.title}
          sweetness={this.state.sweetness}
          variety={this.state.variety}
          />
      </div>
    )
  }
}
export default App;
