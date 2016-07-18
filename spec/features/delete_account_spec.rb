require 'rails_helper'

feature 'user deletes their account', %Q{
  As an authenticated user
  I want to delete my account
  Because I think this place sucks
} do
  # ACCEPTANCE CRITERIA
  # [ ] I must be signed in to delete my account
  # [ ] I am asked to confirm before my account gets deleted
  # [ ] I get a message if I delete my account successfully
  let(:user) {FactoryGirl.create(:user)}

  def sign_in(user)
    visit root_path
    click_link 'Sign In'
    fill_in 'Email', with: user.email
    fill_in 'user_password', with: user.password
    click_button 'Sign In'
  end
  
  scenario 'user deletes their account' do

  end

  scenario 'user accidentally clicked but does not want to delete'

  scenario 'user cannot delete their account unless signed in'
end
