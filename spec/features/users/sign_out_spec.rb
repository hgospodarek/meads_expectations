require 'rails_helper'

feature 'user signs out', %Q{
  As an authenticated user
  I want to sign out
  So that other users can't pretend to be me
} do
  # ACCEPTANCE CRITERIA
  # [x] I must be signed in to sign out
  # [x] I receive a message when I sign out

  scenario 'an authenticated user signs out' do
    user = FactoryGirl.create(:user)
    visit new_user_session_path
    fill_in 'Email', with: user.email
    fill_in 'user_password', with: user.password
    click_button 'Sign In'

    click_link 'Sign Out'
    expect(page).to have_content('Sign In')
    expect(page).to have_content('Smell ya later')
    expect(page).to_not have_content('Sign Out')
  end

  scenario 'an unathenticated user cannot sign out' do
    visit root_path
    expect(page).to have_content('Sign Up')
    expect(page).to have_content('Sign In')
    expect(page).to_not have_content('Sign Out')
  end
end
