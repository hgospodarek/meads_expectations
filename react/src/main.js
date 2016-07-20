import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import RecipesPage from './components/RecipesPage';


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
