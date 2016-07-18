require 'rails_helper'

feature 'user adds recipe', %Q{
  As an authenticated user
  I want to add a recipe
  So I can start tracking them
} do
# ACCEPTANCE CRITERIA
# [ ] Must be logged in
# [ ] Must fill out title, ingredients, steps, sweetness, and mead type
# [ ] Honey, yeast, and water must be included in ingredients
# [ ] There must be at least 3 steps
# [ ] Error messages if bad input
# [ ] Success message if good, redirect to recipe show page if good

  let(:user) { FactoryGirl.create(:user) }

  def sign_in(user)
    visit root_path
    click_link 'Sign In'
    fill_in 'Email', with: user.email
    fill_in 'user_password', with: user.password
    click_button 'Sign In'
  end

 scenario 'user provides all required information' do
   sign_in(user)
   visit root_path

   click_link 'Add New Recipe'
   fill_in 'Title', with: 'Basic Mead'
   select('Basic', from: 'Type')
   select('Semi-Sweet', from: 'Sweetness')
 end

 scenario 'user submits a blank form'

 scenario 'user fails to fill out title'

 scenario 'user fails to fill out mead type'

 scenario 'user fails to fill out ingredients'

 scenario 'user fails to fill out steps'

 scenario 'a user cannot add a recipe unless they are signed in'
end
