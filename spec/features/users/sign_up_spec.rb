require 'rails_helper'

feature 'sign up', %(
  As an unauthenticated user
  I want to sign up
  So I can track my mead recipes and batches.
) do

  # ACCEPTANCE CRITERIA
  # [x] I must specify a valid email address
  # [x] I must specify a password, and confirm that password
  # [x] If I do the above, I am registered and authenticated
  # [x] If I do not do the above, I get an error message

  scenario 'user provides valid required information' do
    visit root_path
    click_link 'Sign Up'
    fill_in 'First Name', with: 'Jon'
    fill_in 'Last Name', with: 'Smith'
    fill_in 'Email', with: 'user@example.com'
    fill_in 'user_password', with: 'password'
    fill_in 'user_password_confirmation', with: 'password'
    click_button 'Sign Up'

    expect(page).to have_content('Ready to brew')
    expect(page).to have_content('Sign Out')
  end

  scenario 'user does not supply required information' do
    visit root_path
    click_link 'Sign Up'
    click_button 'Sign Up'

    expect(page).to have_content("can't be blank")
    expect(page).to_not have_content('Sign Out')
  end

  scenario 'password confirmation does not match' do
    visit root_path
    click_link 'Sign Up'

    fill_in 'user_password', with: 'password'
    fill_in 'user_password_confirmation', with: 'somethingDifferent'
    click_button 'Sign Up'

    expect(page).to have_content("doesn't match")
    expect(page).to_not have_content('Sign Out')
  end
end
