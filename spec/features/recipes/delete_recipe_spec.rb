require 'rails_helper'

feature 'user deletes their recipe', %(
  As an authenticated user
  I want to delete my recipe
  Because I didn't work
) do
  # ACCEPTANCE CRITERIA
  # [x] I must be signed in to delete my recipe
  # [x] I am asked for confirmation before deleting

  let(:user) { FactoryGirl.create(:user) }
  let(:recipe) { FactoryGirl.create(:recipe, user: user) }

  scenario 'user deletes their recipe' do
    login_as(user)
    visit recipe_path(recipe)

    click_link 'Delete Recipe'

    expect(page).to have_content("Guess you didn't like that one.")
    expect(page).to_not have_content(recipe.title)
  end

  scenario 'user accidentally clicked but does not want to delete', js: true do
    login_as(user)
    visit recipe_path(recipe)

    dismiss_confirm do
      click_link 'Delete Recipe'
    end

    expect(page).to_not have_content("Guess you didn't like that one.")
    expect(page).to have_content(recipe.title)
  end

  scenario 'user cannot delete their recipe unless signed in' do
    visit root_path
    expect(page).to_not have_content('Recipes')

    visit recipe_path(recipe)
    expect(page).to have_content("Dude, sign in or sign up first.")
  end
end
