require 'rails_helper'

feature 'user deletes their account', %(
  As an authenticated user
  I want to delete my account
  Because I think this place sucks
) do
  # ACCEPTANCE CRITERIA
  # [x] I must be signed in to delete my account
  # [x] I am asked to confirm before my account gets deleted
  # [x] I get a message if I delete my account successfully

  let(:user) { FactoryGirl.create(:user) }

  scenario 'user deletes their account', js: true do
    login_as(user)

    visit root_path
    click_link 'main-settings-link'

    accept_confirm do
      click_link('Cancel my account')
    end

    expect(page).to have_content("We never liked you anyway.
    Just kidding, we are actually really sad you canclled your account.")
    expect(page).to_not have_content(user.first_name)

  end

  scenario 'user accidentally clicked but does not want to delete', js: true do
    login_as(user)

    visit root_path
    click_link 'main-settings-link'

    dismiss_confirm do
      click_link('Cancel my account')
    end

    expect(page).to_not have_content("We never liked you anyway.
    Just kidding, we are actually really sad you canclled your account.")
    expect(page).to have_content(user.first_name)
  end

  scenario 'user cannot delete their account unless signed in' do
    visit root_path
    expect(page).to_not have_content('Settings')

    visit edit_user_registration_path
    expect(page).to have_content("Dude, sign in or sign up first.")

    visit cancel_user_registration_path
    expect(page).to_not have_content("We never liked you anyway.
    Just kidding, we are actually really sad you canclled your account.")
  end
end
