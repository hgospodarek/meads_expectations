require 'rails_helper'

feature 'user views their recipes', %{
  As an authenticated user
  I want to view all my recipes
  So I can decide which one to use
} do

  # ACCEPTANCE CRITERIA
  # [x] I must be logged in
  # [x] Ingredients are listed alphabetically
  # [x] Steps are listed in order

  let(:user) { FactoryGirl.create(:user) }

  def sign_in(user)
    visit root_path
    click_link 'Sign In'
    fill_in 'Email', with: user.email
    fill_in 'user_password', with: user.password
    click_button 'Sign In'
  end

  scenario 'user views recipe show page' do
    recipe1 = FactoryGirl.create(:recipe, user_id: user.id)
    honey = FactoryGirl.create(:ingredient, name: 'honey', recipe: recipe1)
    water = FactoryGirl.create(:ingredient, name: 'water', recipe: recipe1)
    step1 = Step.create(recipe: recipe1, step_num: 1, action: 'Pour honey')
    step2 = Step.create(recipe: recipe1, step_num: 2, action: 'Mix')

    sign_in(user)
    click_link 'Recipes'
    click_link recipe1.title

    expect(page).to have_content(recipe1.title)
    expect(page).to have_content(recipe1.variety)
    expect(page).to have_content(recipe1.sweetness)

    ingredients.each do |ingredient|
      expect(page).to have_content(ingredient.name)
      expect(page).to have_content(ingredient.unit)
      expect(page).to have_content(ingredient.amount)
    end

    expect(honey.name).to appear_before(water.name)
    expect(step1.action).to appear_before(step2.action)
  end

  scenario 'an unauthenticated user cannot go to recipe show page' do
    recipe1 = FactoryGirl.create(:recipe, user_id: user.id)
    visit root_path
    expect(page).to_not have_content('Recipes')

    visit recipe_path(recipe1)
    expect(page).to have_content('Dude, sign in or sign up first.')
  end
end
