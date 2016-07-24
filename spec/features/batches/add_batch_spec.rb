require 'rails_helper'

feature 'user adds batch', %(
  As a user
  I want to create a batch
  So I can keep track of it
) do

  # ACCEPTANCE CRITERIA
  # [x] I must be logged in to create a batch
  # [x] I must fill in the name of the batch
  # [x] I must choose a recipe to apply to the batch
  # [x] I can only choose from my own recipes, not other users'

  let(:user) { FactoryGirl.create(:user) }
  let(:user2) { FactoryGirl.create(:user) }

  scenario 'authenticated user creates a new batch', js: true do
    user_recipe = FactoryGirl.create(:recipe, user_id: user.id, title: 'totally my recipe')
    user_recipe2 = FactoryGirl.create(:recipe, user_id: user.id, title: 'also my recipe')

    login_as(user)
    visit root_path
    click_link 'Batches'

    fill_in 'Name', with: 'New Mead Batch'
    select user_recipe.title, from: 'Recipe'
    click_button 'Submit Batch'

    expect(page).to have_content('New Mead Batch')
    expect(page).to have_content(user_recipe.title)
  end

  scenario "users can't apply other users' recipes to a batch", js: true do
    user_recipe = FactoryGirl.create(:recipe, user_id: user.id, title: 'totally my recipe')
    user_recipe2 = FactoryGirl.create(:recipe, user_id: user.id, title: 'also my recipe')
    user2_recipe = FactoryGirl.create(:recipe, user_id: user2.id, title: 'not my recipe')

    login_as(user)
    visit batches_path

    expect(page).to have_select('Recipe', with_options: ['Select your option', user_recipe2.title, user_recipe.title])
    expect(page).to_not have_select('Recipe', with_options: [user2_recipe.title])
  end

  scenario 'user leaves one or more fields blank', js: true do
    login_as(user)
    visit batches_path

    expect(page).to have_selector("input[id='name'][required]")
    expect(page).to have_selector("select[id='recipe'][required]")
  end

  scenario 'unathenticated user cannot create a batch' do
    visit root_path
    expect(page).to_not have_content('Batches')

    visit batches_path
    expect(page).to have_content('Dude, sign in or sign up first.')
  end

end
