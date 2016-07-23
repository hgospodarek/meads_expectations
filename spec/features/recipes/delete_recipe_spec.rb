require 'rails_helper'

feature 'user deletes their recipe', %(
  As an authenticated user
  I want to delete my recipe
  Because I didn't work
) do
  # ACCEPTANCE CRITERIA
  # [ ] I must be signed in to delete my recipe

  let(:user) { FactoryGirl.create(:user) }
  let(:recipe) { FactoryGirl.create(:recipe, user: user) }

  scenario 'user deletes their recipe' do
    login_as(user)

    visit recipe_path(recipe)
    click_link 'Delete Recipe'

    expect(page).to have_content("Guess you didn't like that one.")
  end

  scenario 'user cannot delete their recipe unless signed in' do
    visit root_path
    expect(page).to_not have_content('Recipes')

    visit recipe_path(recipe)
    expect(page).to have_content("Dude, sign in or sign up first.")
  end
end
