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
  # [ ] Recipes must can't have no steps / no ingredients

  let(:user) { FactoryGirl.create(:user) }

  scenario 'user fills out all required information', js: true do
    login_as(user)
    visit root_path
    click_link 'main-recipes-link'
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
    click_button 'Save Recipe'

    expect(page).to have_content('Meadiocrity')
  end

  scenario 'user deletes some added steps/ingredients before submitting',
            js: true do
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

    within("div#ingredient-1") do
      find('#ingredient-button').trigger('click')
    end

    within("div#step-3") do
      find('#step-button').trigger('click')
    end

    click_button 'Save Recipe'

    find('a[href="/recipes/1"]').click
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

    fill_in 'Amount', with: 1
    fill_in 'Unit', with: 'gallon'
    fill_in 'Ingredient', with: 'water'
    click_button 'Add Ingredient'

    fill_in 'Step', with: 'Heat the honey gently for a while'
    click_button 'New Step'

    click_button 'Save Recipe'
    find('a[href="/recipes/1"]').click

    expect(page).to have_content('Semi-Sweet')
    expect(page).to have_content('Mead')
  end

  scenario 'users cannot have two recipes with the same name', js: true do
    login_as(user)
    visit recipes_path

    fill_in 'Title', with: 'Meadiocrity'

    fill_in 'Amount', with: 1
    fill_in 'Unit', with: 'gallon'
    fill_in 'Ingredient', with: 'water'
    click_button 'Add Ingredient'

    fill_in 'Step', with: 'Heat the honey gently for a while'
    click_button 'New Step'

    click_button 'Save Recipe'
    wait_for_ajax
    count = Recipe.count

    fill_in 'Title', with: 'Meadiocrity'

    fill_in 'Amount', with: 1
    fill_in 'Unit', with: 'gallon'
    fill_in 'Ingredient', with: 'water'
    click_button 'Add Ingredient'

    fill_in 'Step', with: 'Heat the honey gently for a while'
    click_button 'New Step'

    click_button('Save Recipe')
    expect(Recipe.count).to eq(count)
  end

  scenario 'user submits recipe without steps', js: true do
    login_as(user)
    visit recipes_path

    fill_in 'Title', with: 'Meadiocrity'

    fill_in 'Amount', with: 1
    fill_in 'Unit', with: 'gallon'
    fill_in 'Ingredient', with: 'water'
    click_button 'Add Ingredient'

    click_button 'Save Recipe'

    expect(Recipe.count).to eq(0)
  end

  scenario 'user submits recipe without ingredients', js: true do
    login_as(user)
    visit recipes_path

    fill_in 'Title', with: 'Meadiocrity'

    fill_in 'Step', with: 'Heat the honey gently for a while'
    click_button 'New Step'

    click_button 'Save Recipe'

    expect(Recipe.count).to eq(0)
  end

  scenario 'unathenticated user cannot add recipe' do
    visit root_path
    expect(page).to_not have_content('Recipes')

    visit recipes_path
    expect(page).to have_content('Dude, sign in or sign up first.')
  end
end
