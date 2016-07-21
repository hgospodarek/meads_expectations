require 'rails_helper'

feature 'user deletes a batch', %(
  As an authenticated user
  I want to delete a batch
  because it sucked THAT much
) do
  # ACCEPTANCE CRITERIA
  # [ ] I must be logged in to delete a batch
  # [ ] There must be a batch to delete

  let(:user) { FactoryGirl.create(:user) }
  let(:user_recipe) { FactoryGirl.create(:recipe, user_id: user.id) }

  scenario 'user deletes their batch', js: true do
    recipe1_ingredients = FactoryGirl.create_list(:ingredient, 5,
    recipe: user_recipe)

    recipe1_steps = FactoryGirl.create_list(:step, 5, recipe: user_recipe)

    batch1 = FactoryGirl.create(:batch, user_id: user.id, recipe: user_recipe,
    name: 'Mai Batch')

    login_as(user)
    visit batch_path(batch1)

    accept_confirm do
      click_link('Delete Batch')
    end

    expect(page).to have_content("Batch deleted. Harsh man. Harsh.")
  end
end
