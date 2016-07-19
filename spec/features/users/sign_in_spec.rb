require 'rails_helper'

feature 'user signs in', %Q{
  As a user
  I want to sign in
  So that I can track my mead batches and recipes
} do

  # ACCEPTANCE CRITERIA
  # [x] If I specify a valid, previously-registered email and password,
  #     I am authenticated and aI gain access to the system
  # [x] If I specify an invalid email and password, I remain unauthenticated
  # [x] If I am already signed in, I can't sign in again

  scenario 'an existing user provides a valid email and password' do
    user = FactoryGirl.create(:user)

    visit root_path
    click_link 'Sign In'

    fill_in 'Email', with: user.email
    fill_in 'user_password', with: user.password
    click_button 'Sign In'

    expect(page).to have_content('Welcome back')
    expect(page).to have_content('Sign Out')
  end

  scenario 'a non-existent email and password are provided' do
    visit new_user_session_path

    fill_in 'Email', with: 'nobody@example.com'
    fill_in 'user_password', with: 'password'
    click_button 'Sign In'

    expect(page).to have_content('Invalid Email or password')
    expect(page).to_not have_content('Welcome back')
    expect(page).to_not have_content('Sign Out')
  end

  scenario 'an existing email with the wrong password is denied access' do
    user = FactoryGirl.create(:user)
    visit new_user_session_path

    fill_in 'Email', with: user.email
    fill_in 'user_password', with: 'incorrectPassword'
    click_button 'Sign In'

    expect(page).to have_content('Invalid Email or password')
    expect(page).to_not have_content('Welcome back')
    expect(page).to_not have_content('Sign Out')
  end

  scenario 'an already authenticated user cannot re-sign in' do
    user = FactoryGirl.create(:user)
    visit new_user_session_path
    fill_in 'Email', with: user.email
    fill_in 'user_password', with: user.password
    click_button 'Sign In'

    expect(page).to have_content('Sign Out')
    expect(page).to_not have_content('Sign In')

    visit new_user_session_path
    expect(page).to have_content('You are already signed in.')
  end
end
