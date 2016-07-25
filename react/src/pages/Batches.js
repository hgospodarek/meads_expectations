import 'babel-polyfill';
import React, { Component } from 'react';

export default class Batches extends Component {
  render() {
    const { query } = this.props.location
    const { params } = this.props;
    const { batch } = params;
    const { date, filter } = query
    console.log(this.props)

    return (
      <div>
        <h1>Batches ({batch})</h1>
        <h4>date: {date}, filter: {filter}</h4>
      </div>
    );
  };
};
