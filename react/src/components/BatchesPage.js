import React, { Component } from 'react';
import BatchList from './BatchList'

class BatchesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      batches: []
    }

    this.loadBatches = this.loadBatches.bind(this);
  }
  loadBatches(){
    $.ajax({
      url: "/api/batches",
      contentType: "application/json"
    })
    .success(data => {
      this.setState({batches: data})
    })
  }

  componentDidMount(){
    this.loadBatches();
  }


  render() {
    return(
      <div className="react-batches-row">
        <div className="batches-index-left small-12 medium-6 columns">
          <h3>Batches</h3>
          <BatchList
            batches={this.state.batches}
          />
        </div>
      </div>
    )
  }
}
export default BatchesPage
