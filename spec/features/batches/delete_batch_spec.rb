require 'rails_helper'

feature 'user deletes a batch', %(
  As an authenticated user
  I want to delete a batch
  because it sucked THAT much
) do
  # ACCEPTANCE CRITERIA
  # [x] I must be logged in to delete a batch
  # [x] Upon successful deletion, I receive a message

  let(:user) { FactoryGirl.create(:user) }
  let(:user_recipe) { FactoryGirl.create(:recipe, user_id: user.id) }

  scenario 'user deletes their batch' do
    batch1 = FactoryGirl.create(:batch, user_id: user.id, recipe: user_recipe,
    name: 'Mai Batch')

    login_as(user)
    visit batch_path(batch1)

    click_link('Delete Batch')
    expect(page).to have_content("Batch deleted. Harsh, man. Harsh.")
  end

  scenario 'unathenticated user cannot delete a batch' do
    visit root_path
    expect(page).to_not have_content('Batches')
  end
end
