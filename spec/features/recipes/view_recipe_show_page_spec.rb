require 'rails_helper'

feature 'user views recipe show page', %{
  As an authenticated user
  I want to view one of my recipes
  So I can get the details
} do

  # ACCEPTANCE CRITERIA
  # [x] I must be logged in
  # [x] Ingredients are listed alphabetically

  let(:user) { FactoryGirl.create(:user) }

  scenario 'user views recipe show page' do
    recipe1 = FactoryGirl.create(:recipe, user_id: user.id)
    water = FactoryGirl.create(:ingredient, name: 'water', recipe: recipe1)
    honey = FactoryGirl.create(:ingredient, name: 'honey', recipe: recipe1)
    step1 = Step.create(recipe: recipe1, action: 'Pour honey')
    step2 = Step.create(recipe: recipe1, action: 'Mix')

    login_as(user)
    visit recipe_path(recipe1)

    expect(page).to have_content(recipe1.title)
    expect(page).to have_content(recipe1.variety)
    expect(page).to have_content(recipe1.sweetness)

    recipe1.ingredients.each do |ingredient|
      expect(page).to have_content(ingredient.name)
      expect(page).to have_content(ingredient.unit)
      expect(page).to have_content(ingredient.amount)
    end

    recipe1.steps.each do |step|
      expect(page).to have_content(step.action)
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
