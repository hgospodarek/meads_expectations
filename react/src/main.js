import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import RecipesPage from './components/Recipes/RecipesPage';
import BatchesPage from './components/Batches/BatchesPage';
import BatchShow from './components/Batches/BatchShow';

$(function() {
  if(document.getElementById('recipe-form')) {
    ReactDOM.render(
      <RecipesPage />,
      document.getElementById('recipe-form')
    )};
});

$(function() {
  if(document.getElementById('batches')) {
    ReactDOM.render(
      <BatchesPage />,
      document.getElementById('batches')
    )};
});

$(function() {
  if(document.getElementById('batch-info')) {
    let batchID = document.getElementById('batch-info')
    let id = batchID.className
    ReactDOM.render(
      <BatchShow id={id}/>,
      batchID
    )};
});
