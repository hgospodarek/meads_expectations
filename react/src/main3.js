import 'babel-polyfill';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Batches from './pages/Batches';
import Layout from './pages/Layout';
import Recipes from './pages/Recipes';

$(function() {
  if(document.getElementById('app')) {
    ReactDOM.render(
      <Router history={hashHistory}>
        <Route path="/" component={Layout}>
          <IndexRoute component={Batches}></IndexRoute>
          <Route path="batches(/:batch)" component={Batches}></Route>
          <Route path="recipes(/:recipe)" component={Recipes}></Route>
        </Route>
      </Router>,
      document.getElementById('app')
    )};
});
