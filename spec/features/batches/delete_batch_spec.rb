require 'rails_helper'

feature 'user deletes a batch', %(
  As an authenticated user
  I want to delete a batch
  because it sucked THAT much
) do
  # ACCEPTANCE CRITERIA
  # [x] I must be logged in to delete a batch
  # [x] Upon successful deletion, I receive a message
  # [x] I am asked to confirm before deleting

  let(:user) { FactoryGirl.create(:user) }
  let(:user_recipe) { FactoryGirl.create(:recipe, user_id: user.id) }
  let(:batch1) { FactoryGirl.create(:batch, user_id: user.id, recipe: user_recipe, name: 'Mai Batch') }

  scenario 'user deletes their batch' do
    login_as(user)
    visit batch_path(batch1)

    click_link('Delete Batch')

    expect(page).to have_content("Batch deleted. Harsh, man. Harsh.")
    expect(page).to_not have_content(batch1.name)
  end

  scenario 'user accidentally clicked but does not want to delete', js: true do
    login_as(user)
    visit batch_path(batch1)

    dismiss_confirm do
      click_link('Delete Batch')
    end

    expect(page).to_not have_content("Batch deleted. Harsh, man. Harsh.")
    expect(page).to have_content(batch1.name)
  end

  scenario 'unathenticated user cannot delete a batch' do
    visit root_path
    expect(page).to_not have_link('Batches')
  end
end
