require 'rails_helper'

feature 'user edits their account', %Q{
  As an authenticated user
  I want to edit my account
  So I can change my email and password
} do
  # ACCEPTANCE CRITERIA
  # [x] I must be signed in to edit my account
  # [x] I must provide my current password to make any changes
  # [x] I can update my email address, password, or both

  let(:user) { FactoryGirl.create(:user) }

  scenario 'user provides new email and password, and correct current password' do
    login_as(user)
    visit root_path
    click_link 'Settings'

    fill_in 'Email', with: 'another@mail.com'
    fill_in 'user_password', with: 'newpassword'
    fill_in 'user_password_confirmation', with: 'newpassword'
    fill_in 'Current password', with: user.password
    click_button 'Update'

    expect(page).to have_content('You updated your account, look at you go!')
  end

  scenario 'user updates only their email' do
    login_as(user)

    visit root_path
    click_link 'Settings'

    fill_in 'Email', with: 'another@mail.com'
    fill_in 'Current password', with: user.password
    click_button 'Update'

    expect(page).to have_content('You updated your account, look at you go!')
  end

  scenario 'user updates only their password' do
    login_as(user)

    visit root_path
    click_link "Settings"

    fill_in "user_password", with: "newpassword"
    fill_in "user_password_confirmation", with: "newpassword"
    fill_in "Current password", with: user.password
    click_button "Update"

    expect(page).to have_content("You updated your account, look at you go!")
  end

  scenario 'user provides incorrect current password' do
    login_as(user)

    visit root_path
    click_link 'Settings'

    fill_in 'Email', with: 'another@mail.com'
    fill_in 'user_password', with: 'newpassword'
    fill_in 'user_password_confirmation', with: 'newpassword'
    fill_in 'Current password', with: 'totallynotmypassword'
    click_button 'Update'

    expect(page).to_not have_content('You updated your account, look at you go!')
    expect(page).to have_content('is invalid')
  end


  scenario 'user cannot edit their account unless they are signed in' do
    visit root_path
    expect(page).to_not have_content('Settings')

    visit edit_user_registration_path
    expect(page).to have_content("Dude, sign in or sign up first.")
  end

end
