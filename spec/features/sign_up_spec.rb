require 'rails_helper'

feature 'sign up' , %Q{
  As an unauthenticated user
  I want to sign up
  So I can track my mead recipes and batches.
} do

  # ACCEPTANCE CRITERIA
  # [ ] I must specify a valid email address
  # [ ] I must specify a password, and confirm that password
  # [ ] If I do the above, I am registered and authenticated
  # [ ] If I do not do the above, I get an error message

  scenario 'user provides valid required information' do
    visit root_path
    click_link 'Sign Up'
    fill_in 'First Name', with: 'Jon'
    fill_in 'Last Name', with: 'Smith'
    fill_in 'Email', with: 'user@example.com'
    fill_in 'Password', with: 'password'
    fill_in 'Password Confirmation', with: 'password'
    click_button 'Sign Up'

    expect(page).to have_content('Ready to brew')
    expect(page).to have_content('Sign Out')
  end

  scenario 'user does not supply required information'

  scenario 'password confirmation does not match'
end
