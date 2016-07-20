require 'rails_helper'

feature 'user views their recipes', %(
  As an authenticated user
  I want to view all my batches
  So I can see what I've got going on
) do
  # ACCEPTANCE CRITERIA
  # [ ] I must be logged into see my batches
  # [ ] I can only see my batches, not other users'
  # [ ] Batches are listed by date

  let(:user) { FactoryGirl.create(:user) }
  let(:user2) { FactoryGirl.create(:user) }
  let(:user_recipe) { FactoryGirl.create(:recipe, user_id: user.id) }
  let(:user2_recipe) { FactoryGirl.create(:recipe, user_id: user2.id) }
  let(:recipe1_ingredients) { FactoryGirl.create_list(:ingredient, 5, recipe: user_recipe) }
  let(:recipe2_ingredients) { FactoryGirl.create_list(:ingredient, 5, recipe: user2_recipe) }
  let(:recipe1_steps) { FactoryGirl.create_list(:step, 5, recipe: user_recipe) }
  let(:recipe2_steps) { FactoryGirl.create_list(:step, 5, recipe: user2_recipe) }


  scenario 'authenticated user views list of batches' do
    batch1 = FactoryGirl.create(:batch, user_id: user.id, recipe: user_recipe, name: 'Mai Batch')
    batch2 = FactoryGirl.create(:batch, user_id: user2.id, recipe: user2_recipe, name: 'Not Mai Batch')

    login_as(user)
    visit root_path

    click_link 'Batches'

    expect(page).to have_content(batch1.name)
    expect(page).to have_content(batch1.recipe.title)
    expect(page).to have_content(batch1.recipe.variety)
    expect(page).to have_content(batch1.recipe.sweetness)

    batch1.recipe.ingredients.each do |ingredient|
      expect(page).to have_content(ingredient.amount)
      expect(page).to have_content(ingredient.unit)
      expect(page).to have_content(ingredient.name)
    end

    batch1.recipe.steps.each do |step|
      expect(page).to have_content(step.action)
    end

    expect(page).to_not have_content(batch2.name)
    expect(page).to_not have_content(batch2.recipe.title)
    expect(page).to_not have_content(batch2.recipe.variety)
    expect(page).to_not have_content(batch2.recipe.sweetness)
  end

  scenario 'unathenticated user does not see list of batches' do
    visit root_path
    expect(page).to_not have_content('Batches')

    visit batches_path
    expect(page).to have_content('Dude, sign in or sign up first.')
  end

end
