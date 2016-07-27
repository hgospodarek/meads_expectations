require 'rails_helper'

RSpec.describe 'Steps', type: :request do
  let(:user) { FactoryGirl.create(:user) }

  describe '#create' do
    it 'creates a new batch step' do
      recipe = FactoryGirl.create(:recipe, user: user)
      batch = FactoryGirl.create(:batch, user: user, recipe: recipe)
      login_as user

      step = FactoryGirl.build(:step, recipe: nil)

      post "/api/v1/batches/#{batch.id}/steps", { step: {action: step.action,
        batch_id: batch.id } }, format: :json

      expect(response.status).to be(201)
    end

    it 'does not work for unauthenticated users' do
      recipe = FactoryGirl.create(:recipe, user: user)
      batch = FactoryGirl.create(:batch, user: user, recipe: recipe)

      step = FactoryGirl.build(:step, recipe: nil)

      post "/api/v1/batches/#{batch.id}/steps", { step: { action: step.action,
        batch_id: batch.id } }, format: :json
      expect(response.status).to_not be(200)
    end

    it 'requires at least the step action and batch id' do
      recipe = FactoryGirl.create(:recipe, user: user)
      batch = FactoryGirl.create(:batch, user: user, recipe: recipe)
      login_as user
      step = FactoryGirl.build(:step, recipe: nil)

      post "/api/v1/batches/#{batch.id}/steps", { step: { action: nil } },
      format: :json

      expect(response.status).to be(422)
    end
  end

  describe '#destroy' do
    it 'deletes the given step' do
      recipe = FactoryGirl.create(:recipe, user: user)
      batch = FactoryGirl.create(:batch, user: user, recipe: recipe)
      steps = FactoryGirl.create_list(:step, 5, batch: batch, recipe: nil)
      login_as user

      initial_steps = Step.all
      expect(initial_steps.size).to eq(5)

      delete "/api/v1/batches/#{batch.id}/steps/#{steps.first.id}",
      format: :json

      final_steps = Step.all
      expect(final_steps.size).to eq(4)
    end

    it 'does not work for unauthenticated users' do
      recipe = FactoryGirl.create(:recipe, user: user)
      batch = FactoryGirl.create(:batch, user: user, recipe: recipe)
      steps = FactoryGirl.create_list(:step, 5, batch_id: batch.id, recipe: nil)

      initial_steps = Step.all
      expect(initial_steps.size).to eq(5)

      delete "/api/v1/batches/#{batch.id}/steps/#{steps.first.id}",
      format: :json

      final_steps = Step.all
      expect(final_steps.size).to eq(5)
    end
  end
end
