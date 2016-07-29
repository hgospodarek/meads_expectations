# Meads Expectations
![Build Status](https://codeship.com/projects/eb6ca340-267d-0134-df97-76330feb89c7/status?branch=master)
![Code Climate](https://codeclimate.com/github/hgospodarek/meads_expectations.png)
![Coverage Status](https://coveralls.io/repos/hgospodarek/meads_expectations/badge.png)

http://meads-expectations.herokuapp.com

A Rails web app where users can track their mead brewing recipes and batches. Users apply a recipe to a batch and receive a to-do list generated from the recipe steps.

If they complete the steps, they are prompted to mark the recipe attempt as a success or failure, which produces a chart on the recipe page.

If they choose to deviate from the recipe and record their own steps, they are presented with a comparison of suggested steps vs. actual steps once the batch is finished.


## Functionality
- Devise authorization
- Rails back end performs steps comparison and calculates ABV based on user hydrometer readings
- React components and AJAX eliminate page reload when creating recipes and batches, and all tracking of batch progress.
- Chart.js presents recipe success / failure ratio
- Use of Foundation framework and jQuery TouchSwipe for mobile-friendliness

## Dependencies
- Ruby 2.2.3
- Rails 4.2.5
- Postgres

## Instructions
1. Clone down the repo git@github.com:hgospodarek/meads_expectations.git
2. `cd meads_expectations`
3. `bundle install`
4. `npm install`
5. `rake db:create`
6. `rake db:migrate`
7. `rails s`
8. In a separate terminal window, `npm start`
