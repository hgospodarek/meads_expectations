require 'rails_helper'

feature 'user updates a batch', %(
As an authenticated user
I want to update my batch as I complete it
So I can keep it up to date
) do
  # ACCEPTANCE CRITERIA
  # [x] Must be logged in
  # [ ] I can mark a batch as finished
  # [ ] I can fill out the initial and final hydrometer readings
  # [ ] I can't fill out the final hydrometer reading before the initial one
  # [ ] I can mark the next suggested step as completed
  # [ ] I can add a new step instead of completing the suggested one
  # [ ] Once I add a new step, I am no longer following the recipe steps,
  #     and must enter my own step every time
  # [ ] Once a batch is marked complete, I can save it as a new recipe

  let(:user) { FactoryGirl.create(:user) }
  let(:user_recipe) { FactoryGirl.create(:recipe, user_id: user.id) }
  let(:batch) { FactoryGirl.create(:batch, user_id: user.id, recipe: user_recipe) }

  xscenario 'user marks batch as finished', js: true do
    login_as(user)
    visit batch_path(batch)

    click_button 'Finish Batch' # This breaks Capybara due to a QT error
    expect(page).to have_content("Finished: #{batch.end_date.to_formatted_s(:rfc822)}")
  end

  xscenario 'unathenticated user cannot edit batch' do
    visit root_path
    expect(page).to_not have_content('Batches')

    visit batch_path(batch)
    expect(page).to have_content('Dude, sign in or sign up first.')
  end
end
