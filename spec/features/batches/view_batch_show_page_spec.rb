require 'rails_helper'

feature 'user views batch show page', %(
  As an authenticated user
  I want to view the details of a batch
  So I can know where I'm at with it
) do

  # ACCEPTANCE CRITERIA
  # [x] I must be logged in
  # [x] I see batch name, its recipe information, start and end date,
  #     initial and final hydrometer readings, approximate abv, my progress
  #     so far, and the next step suggested by the recipe

  let(:user) { FactoryGirl.create(:user) }

  let(:user_recipe) { FactoryGirl.create(:recipe, user_id: user.id, title: 'totally my recipe') }

  scenario 'authenticated user views batch show page', js: true do
    batch = FactoryGirl.create(:batch, user: user, name: "A Mead Batch", recipe: user_recipe, initial_hydrometer: 1.08, final_hydrometer: 1.01, created_at: 3.months.ago.to_date, end_date: Date.today)

    step = FactoryGirl.create(:step, batch: batch, action: 'Pour honey')
    step2 = FactoryGirl.create(:step, batch: batch, action: 'Mix')

    login_as(user)
    visit batch_path(batch)

    expect(page).to have_content(batch.name)
    expect(page).to have_content(batch.recipe.title)
    expect(page).to have_content(batch.recipe.variety)
    expect(page).to have_content(batch.recipe.sweetness)
    expect(page).to have_content(batch.created_at.localtime.strftime("%d %b %Y"))
    expect(page).to have_content(batch.end_date.to_formatted_s(:rfc822))
    expect(page).to have_content(batch.initial_hydrometer)
    expect(page).to have_content(batch.final_hydrometer)
    expect(page).to have_content(batch.approx_abv)
  end

  scenario 'user sees completed steps with date and time', js: true do
    batch = FactoryGirl.create(:batch, user: user, name: "A Mead Batch", recipe: user_recipe)

    step = FactoryGirl.create(:step, batch: batch, action: 'Pour honey', completed?: true, updated_at: Time.now)

    login_as(user)
    visit batch_path(batch)

    expect(page).to have_content(step.action)
    expect(page).to have_content(step.updated_at.localtime.strftime("%d %b, %l:%M %P"))

  end
  scenario 'user sees the next suggested step', js: true do
    batch = FactoryGirl.create(:batch, user: user, name: "A Mead Batch", recipe: user_recipe)

    next_step = FactoryGirl.create(:step, batch: batch, action: 'Add water')

    future_step = FactoryGirl.create(:step, batch: batch, action: 'Mix it up')

    login_as(user)
    visit batch_path(batch)

    expect(page).to have_content(next_step.action)
    expect(page).to_not have_content(future_step.action)
  end

  scenario 'unathenticated user cannot view batch show page' do
    batch = FactoryGirl.create(:batch, user: user, name: "A Mead Batch", recipe: user_recipe)

    visit root_path
    expect(page).to_not have_link('Batches')

    visit batch_path(batch)
    expect(page).to have_content('Dude, sign in or sign up first.')
  end
end
