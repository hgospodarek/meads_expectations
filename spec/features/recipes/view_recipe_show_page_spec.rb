require 'rails_helper'

feature 'user views a recipe show page', %{
  As an authenticated user
  I want to view the details
  So I can see its steps and ingredients
} do

  # ACCEPTANCE CRITERIA
  # [ ] I must be logged in
  # [ ] Steps are listed in order
  # [ ] Ingredients are listed alphabetically

  let(:user) { FactoryGirl.create(:user) }

  def sign_in(user)
    visit root_path
    click_link 'Sign In'
    fill_in 'Email', with: user.email
    fill_in 'user_password', with: user.password
    click_button 'Sign In'
  end

  scenario 'user navigates to recipe show page' do
    recipe1 = FactoryGirl.create(:recipe, user_id: user.id)
    recipe1_ingredients = FactoryGirl.create_list(:recipe_ingredient, recipe: recipe1, 5)
    recipe1_steps = FactoryGirl.create_list(:recipe_steps, recipe: recipe1, 5)

    sign_in(user)
    visit root_path
    click_link 'Recipes'

    click_link recipe1.title

    expect(page).to have_content(recipe1.title)
    expect(page).to have_content(recipe1.sweetness)
    expect(page).to have_content(recipe1.variety)

    recipe1_ingredients.each do |recipe_ingredient|
      expect(page).to have_content(recipe_ingredient.ingredient.name)
      expect(page).to have_content(recipe_ingredient.amount)
      expect(page).to have_content(recipe_ingredient.unit)
    end

  end

end
