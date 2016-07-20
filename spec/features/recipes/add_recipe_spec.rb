require 'rails_helper'

feature 'user creates recipe', %(
  As an authenticated user
  I want to create a recipe
  So I can use it in the future
) do
  # ACCEPTANCE CRITERIA
  # [ ] Must be logged in
  # [ ] Navigate to new recipe path from root
  # [ ] Must fill out title, sweetness, variety, ingredients, and steps
  # [ ] Error messages if bad input
  # [ ] Success message if good, redirect to recipe show page if good

  let(:user) { FactoryGirl.create(:user) }

  xscenario 'user fills out all required information', js: true do
    login_as(user)
    visit root_path
    count = Recipe.all.size
    click_link 'Recipes'
    fill_in 'Title', with: 'Meadiocrity'
    select('Sweet', from: 'Sweetness')
    select('Basic', from: 'Variety')

    fill_in 'Amount', with: 3
    fill_in 'Unit', with: 'lbs'
    fill_in 'Ingredient', with: 'honey'
    click_button 'Add Ingredient'

    fill_in 'Amount', with: 1
    fill_in 'Unit', with: 'gallons'
    fill_in 'Ingredient', with: 'water'
    click_button 'Add Ingredient'

    fill_in 'Step', with: 'Heat the honey gently for a while'
    click_button 'Add Step'

    fill_in 'Step', with: 'Mix the water into the honey'
    click_button 'Add Step'
    click_button 'Submit Recipe'

    expect(page).to have_content('Meadiocrity')
  end

  scenario 'user leaves one or more fields blank'

  scenario 'user adds ingredients but then deletes them'

  scenario 'unathenticated user cannot add recipe'
end
