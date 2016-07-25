import 'babel-polyfill';
import React, { Component } from 'react';
import { Link } from "react-router"

import Nav from "../components/layout/Nav"

export default class Layout extends Component {
  render() {
    const { location } = this.props;
    const containerStyle = {
      marginTop: "60px"
    }
    return (
      <div>
        <Nav location={location} />

        <div className="row column" style={containerStyle}>
          <div className="row">
            <div className="small-12 columns">
              <h1>Meads Expecations</h1>

              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  };
};
