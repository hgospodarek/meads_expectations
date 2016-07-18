require 'rails_helper'

feature 'user views their recipes', %Q{
  As an authenticated user
  I want to view all my recipes
  So I can decide which one to use
} do

# ACCEPTANCE CRITERIA
# [x] I must be logged into see my recipes
# [x] I can only see my recipes, not other users'
# [ ] Recipes are listed alphabetically

  let(:user) { FactoryGirl.create(:user) }
  let(:user2) { FactoryGirl.create(:user) }

  def sign_in(user)
    visit root_path
    click_link 'Sign In'
    fill_in 'Email', with: user.email
    fill_in 'user_password', with: user.password
    click_button 'Sign In'
  end

  scenario 'authenticated user views list of recipes' do
    recipe1 = FactoryGirl.create(:recipe, user_id: user.id)
    recipe2 = FactoryGirl.create(:recipe, title: 'Another Mead', user_id: user.id)
    not_yours = FactoryGirl.create(:recipe, title: 'Not Your Mead Recipe', user_id: user2.id)

    sign_in(user)
    click_link 'Recipes'

    expect(page).to have_content(recipe1.title)
    expect(page).to have_content(recipe2.title)
    expect(page).to_not have_content(not_yours.title)
    expect(recipe2.title).to appear_before(recipe1.title)
  end

  scenario 'user has no recipes' do

  end

  scenario 'unathenticated user does not see list of recipes' do
    visit root_path
    expect(page).to_not have_content('Recipes')

    visit recipes_path
    expect(page).to have_content("Dude, sign in or sign up first.")
  end
end
