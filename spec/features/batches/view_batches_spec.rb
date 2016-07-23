require 'rails_helper'

feature 'user views their batches', %(
  As an authenticated user
  I want to view all my batches
  So I can see what I've got going on
) do
  # ACCEPTANCE CRITERIA
  # [x] I must be logged in to see my batches
  # [x] I can only see my batches, not other users'
  # [x] Batches are listed by end date with latest first
  # [x] Batches with no end date listed by start date, with earliest first

  let(:user) { FactoryGirl.create(:user) }
  let(:user2) { FactoryGirl.create(:user) }

  let(:user_recipe) { FactoryGirl.create(:recipe, user_id: user.id) }
  let(:user2_recipe) { FactoryGirl.create(:recipe, user_id: user2.id) }

  scenario 'authenticated user views list of batches', js: true do
    latest_incompleted = FactoryGirl.create(:batch, user_id: user.id, recipe: user_recipe,
    name: 'Latest Incompleted Batch')
    oldest_incompleted = FactoryGirl.create(:batch, user_id: user.id, recipe: user_recipe,
    name: 'Oldest Incompleted Batch', start_date: Date.yesterday)

    oldest_completed = FactoryGirl.create(:batch, user_id: user.id, recipe: user_recipe,
    name: 'Oldest Completed Batch', end_date: Date.yesterday)
    latest_completed = FactoryGirl.create(:batch, user_id: user.id, recipe: user_recipe,
    name: 'Latest Completed Batch', end_date: Date.today)

    login_as(user)
    visit root_path

    click_link 'Batches'

    expect(page).to have_content(oldest_completed.name)
    expect(page).to have_content(oldest_completed.recipe.title)
    expect(page).to have_content(oldest_completed.recipe.variety)
    expect(page).to have_content(oldest_completed.recipe.sweetness)

    expect(latest_completed.name).to appear_before(oldest_completed.name)
    expect(latest_incompleted.name).to appear_before(latest_completed.name)
    expect(oldest_incompleted.name).to appear_before(latest_incompleted.name)
  end

  scenario "users can't see other users' batches" do
    batch1 = FactoryGirl.create(:batch, user_id: user.id, recipe: user_recipe,
    name: 'Mai Batch', end_date: Date.today)

    user2batch = FactoryGirl.create(:batch, user_id: user2.id, recipe: user2_recipe,
    name: 'Not Mai Batch')

    login_as(user)
    visit root_path
    click_link 'Batches'

    expect(page).to_not have_content(user2batch.name)
  end

  scenario 'unathenticated user does not see list of batches' do
    visit root_path
    expect(page).to_not have_content('Batches')

    visit batches_path
    expect(page).to have_content('Dude, sign in or sign up first.')
  end

end
