require 'rails_helper'

feature 'user views their recipes', %{
  As an authenticated user
  I want to view all my recipes
  So I can decide which one to use
} do

  # ACCEPTANCE CRITERIA
  # [x] I must be logged into see my recipes
  # [x] I can only see my recipes, not other users'
  # [x] If I have no recipes, I see a placeholder

  let(:user) { FactoryGirl.create(:user) }
  let(:user2) { FactoryGirl.create(:user) }

  scenario 'authenticated user views list of recipes', js: true do
    recipe1 = FactoryGirl.create(:recipe, user_id: user.id)
    recipe2 = FactoryGirl.create(:recipe, title: 'Another Mead',
                                  user_id: user.id)
    not_yours = FactoryGirl.create(:recipe, title: 'Not Your Mead Recipe',
                                    user_id: user2.id)

    login_as(user)
    visit root_path

    click_link 'main-recipes-link'

    expect(page).to have_content(recipe1.title)
    expect(page).to have_content(recipe1.sweetness)
    expect(page).to have_content(recipe1.variety)
    expect(page).to have_content(recipe2.title)
    expect(page).to have_content(recipe2.sweetness)
    expect(page).to have_content(recipe2.variety)

    expect(recipe2.title).to appear_before(recipe1.title)
  end

  scenario "users can't see other users' recipes", js: true do
    login_as(user)
    visit root_path

    click_link 'main-recipes-link'
    recipe2 = FactoryGirl.create(:recipe, title: 'Another Mead',
                                  user_id: user.id)
    not_yours = FactoryGirl.create(:recipe, title: 'Not Your Mead Recipe',
                                    user_id: user2.id)

    expect(page).to_not have_content(not_yours.title)
  end

  scenario 'unathenticated user does not see list of recipes' do
    visit root_path
    expect(page).to_not have_content('Recipes')

    visit recipes_path
    expect(page).to have_content('Dude, sign in or sign up first.')
  end

  scenario 'user has no recipes', js: true do
    login_as(user)
    visit root_path

    click_link 'main-recipes-link'
    expect(page).to have_content("Your recipes will appear here once you've made some!")
  end
end
