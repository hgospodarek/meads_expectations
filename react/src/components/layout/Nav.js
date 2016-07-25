import 'babel-polyfill';
import React, { Component } from 'react';
import { Link } from "react-router"

export default class Nav extends Component {
  constructor() {
    super()
  }
  render() {
    const { location } = this.props
    const { batchesClass } = location.pathname.match(/^\/batches/) ? "active" : "";
    const { recipesClass } = location.pathname.match(/^\/recipes/) ? "active" : "";

    return (
      <div>
        <div className="top-bar">
          <div className="top-bar-left">
            <ul className="dropdown menu" data-dropdown-menu>
              <li className="menu-text"><Link to="/">Meads Expectations</Link></li>
                <li className={recipesClass}><Link to="recipes">Recipes</Link></li>
                <li className={batchesClass}><Link to="batches">Batches</Link></li>
            </ul>
          </div>
          <div className="top-bar-right">
            <ul className="menu">
            </ul>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  };
};
//
