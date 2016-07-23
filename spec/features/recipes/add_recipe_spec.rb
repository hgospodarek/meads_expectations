require 'rails_helper'

feature 'user creates recipe', %(
As an authenticated user
I want to create a recipe
So I can use it in the future
) do
  # ACCEPTANCE CRITERIA
  # [x] Must be logged in
  # [x] Must fill out title
  # [x] Sweetness and variety have defaults
  # [x] User can't have two recipes with the same name

  let(:user) { FactoryGirl.create(:user) }

  scenario 'user fills out all required information', js: true do
    login_as(user)
    visit root_path
    click_link 'Recipes'
    fill_in 'Title', with: 'Meadiocrity'
    select('Sweet', from: 'Sweetness')
    select('Mead', from: 'Variety')

    fill_in 'Amount', with: 3
    fill_in 'Unit', with: 'lbs'
    fill_in 'Ingredient', with: 'honey'
    click_button 'Add Ingredient'

    fill_in 'Amount', with: 1
    fill_in 'Unit', with: 'gallons'
    fill_in 'Ingredient', with: 'water'
    click_button 'Add Ingredient'

    fill_in 'Step', with: 'Heat the honey gently for a while'
    click_button 'New Step'

    fill_in 'Step', with: 'Mix the water into the honey'
    click_button 'New Step'
    click_button 'Submit Recipe'

    expect(page).to have_content('Meadiocrity')
  end

  scenario 'user deletes some added steps/ingredients before submitting', js: true do
    login_as(user)
    visit recipes_path
    fill_in 'Title', with: 'Meadiocrity'

    select('Sweet', from: 'Sweetness')
    select('Melomel', from: 'Variety')

    fill_in 'Amount', with: 3
    fill_in 'Unit', with: 'lb'
    fill_in 'Ingredient', with: 'honey'
    click_button 'Add Ingredient'

    fill_in 'Amount', with: 1
    fill_in 'Unit', with: 'gallon'
    fill_in 'Ingredient', with: 'water'
    click_button 'Add Ingredient'

    fill_in 'Step', with: 'Heat the honey gently for a while'
    click_button 'New Step'

    fill_in 'Step', with: 'Mix the water into the honey'
    click_button 'New Step'

    within("li#ingredient-1") do
      click_button 'Delete'
    end

    within("li#step-3") do
      click_button 'Delete'
    end

    click_button 'Submit Recipe'

    click_link 'Meadiocrity'
    expect(page).to have_content('Sweet')
    expect(page).to have_content('Melomel')
    expect(page).to have_content('1.0 gallon water')
    expect(page).to have_content('Mix the water into the honey')
    expect(page).to_not have_content('1.0 lb honey')
    expect(page).to_not have_content('Heat the honey gently for a while')
  end

  scenario 'user leaves one or more fields blank', js: true do
    login_as(user)
    visit recipes_path

    expect(page).to have_selector("input[id='ingredient'][required]")
    expect(page).to have_selector("input[id='action'][required]")
    expect(page).to have_selector("input[id='amount'][required]")
    expect(page).to have_selector("input[id='unit'][required]")
    expect(page).to have_selector("input[id='title'][required]")
  end

  scenario 'default sweetness and variety are set', js: true do
    login_as(user)
    visit recipes_path

    fill_in 'Title', with: 'Meadiocrity'
    click_button 'Submit Recipe'
    click_link 'Meadiocrity'

    expect(page).to have_content('Semi-Sweet')
    expect(page).to have_content('Mead')
  end

  scenario 'users cannot have two recipes with the same name', js: true do
    login_as(user)
    visit recipes_path

    fill_in 'Title', with: 'Meadiocrity'
    click_button 'Submit Recipe'
    expect(page).to have_link('Meadiocrity')

    fill_in 'Title', with: 'Meadiocrity'
    message = accept_alert do
      click_button('Submit Recipe')
    end

    expect(message).to eq("You'll only frustrate yourself later if
    you make two recipes with the same name")
  end

  scenario 'unathenticated user cannot add recipe' do
    visit root_path
    expect(page).to_not have_content('Recipes')

    visit recipes_path
    expect(page).to have_content('Dude, sign in or sign up first.')
  end
end
