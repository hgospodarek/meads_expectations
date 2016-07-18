require 'rails_helper'

feature 'user deletes their account', %Q{
  As an authenticated user
  I want to delete my account
  Because I think this place sucks
} do
  # ACCEPTANCE CRITERIA
  # [x] I must be signed in to delete my account
  # [x] I am asked to confirm before my account gets deleted
  # [x] I get a message if I delete my account successfully

  let(:user) {FactoryGirl.create(:user)}

  def sign_in(user)
    visit root_path
    click_link 'Sign In'
    fill_in 'Email', with: user.email
    fill_in 'user_password', with: user.password
    click_button 'Sign In'
  end

  scenario 'user deletes their account', js:true do
    sign_in(user)
    visit root_path
    click_link 'Settings'

    accept_confirm do
      click_link('Cancel my account')
    end

    expect(page).to have_content("We never liked you anyway. Just kidding, we are actually really sad you canclled your account.")
  end

  scenario 'user accidentally clicked but does not want to delete', js:true do
    sign_in(user)
    visit root_path
    click_link 'Settings'

    dismiss_confirm do
      click_link('Cancel my account')
    end

    expect(page).to_not have_content("We never liked you anyway. Just kidding, we are actually really sad you canclled your account.")
  end

  scenario 'user cannot delete their account unless signed in' do
    visit root_path
    expect(page).to_not have_content('Settings')

    visit edit_user_registration_path
    expect(page).to have_content("Dude, sign in or sign up first.")

    visit cancel_user_registration_path
    expect(page).to_not have_content("We never liked you anyway. Just kidding, we are actually really sad you canclled your account.")
  end
end
