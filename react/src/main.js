import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import RecipesPage from './components/Recipes/RecipesPage';
import BatchesPage from './components/Batches/BatchesPage';
import BatchShowContainer from './components/Batches/BatchShowContainer';
import RecipeShowContainer from './components/Recipes/RecipeShowContainer';


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
      <BatchShowContainer id={id}/>,
      batchID
    )};
});

$(function() {
  if(document.getElementById('recipe-info')) {
    let recipeID = document.getElementById('recipe-info')
    let id = recipeID.className
    ReactDOM.render(
      <RecipeShowContainer id={id}/>,
      recipeID
    )};
});
