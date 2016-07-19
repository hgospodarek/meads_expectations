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

  scenario 'user fills out all required information' do
    login_as(user)
    visit root_path

    click_link 'Add Recipe'
    fill_in 'Title', with: 'Meadiocrity'
    select('Sweet', from: 'Sweetness')
    select('Basic', from: 'Variety')

    3.times do
      click_button('Up')
    end
    select('lbs', from: 'unit')
    fill_in 'Ingredient', with: 'honey'
    click_button 'Add Ingredient'

    select('gal', from: 'unit')
    fill_in 'Ingredient', with: 'water'

    fill_in 'Step', with: 'Heat the honey gently for a while'
    click_button 'Add Step'

    fill_in 'Step', with: 'Mix the water into the honey'

    click_button 'Submit Recipe'

    expect(page).to have_content 'Recipe added successfully'

  end

  scenario 'user leaves one or more fields blank'

  scenario 'user adds ingredients but then deletes them'

  scenario 'unathenticated user cannot add recipe'
end
