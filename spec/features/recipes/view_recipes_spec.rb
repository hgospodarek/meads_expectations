require 'rails_helper'

feature 'user views their recipes', %Q{
  As an authenticated user
  I want to view all my recipes
  So I can decide which one to use
} do

# ACCEPTANCE CRITERIA
# [ ] I must be logged into see my recipes
# [ ] I can only see my recipes, not other users'
# [ ] Recipes are listed alphabetically

  let(:user) {FactoryGirl.create(:user)}

  def sign_in(user)
    visit root_path
    click_link 'Sign In'
    fill_in 'Email', with: user.email
    fill_in 'user_password', with: user.password
    click_button 'Sign In'
  end

  scenario 'authenticated user views list of recipes' do
    sign_in(user)
    click_link 'Recipes'

  end

  scenario 'unathenticated user does not see list of recipes'
end
