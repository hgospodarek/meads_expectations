require 'rails_helper'

RSpec.describe 'Batches', type: :request do
  let(:user) { FactoryGirl.create(:user) }
  let(:recipe) { FactoryGirl.create(:recipe, user: user) }

  describe '#index' do
    it 'returns an error if a user is not signed in' do
      FactoryGirl.create_list(:batch, 5, user: user, recipe: recipe)

      get '/api/v1/batches', format: :json
      json = JSON.parse(response.body)

      expect(response.status).to be(401)
    end

    it "returns a list of the user's batches if the user is signed in" do
      batches = FactoryGirl.create_list(:batch, 5, user: user, recipe: recipe)
      login_as user

      get '/api/v1/batches', format: :json
      json = JSON.parse(response.body)

      expect(response.status).to be(200)

      batches.each do |batch|
        expect(response.body).to include(batch.name)
      end
    end
  end

  describe '#show' do
    it 'returns the specified batch' do
      batch1 = FactoryGirl.create(:batch, user: user, recipe: recipe, name: "Batch 1")
      batch2 = FactoryGirl.create(:batch, user: user, recipe: recipe, name: "Batch 2")

      login_as user

      get "/api/v1/batches/#{batch1.id}", format: :json
      json = JSON.parse(response.body)

      expect(response.status).to be(200)

      expect(response.body).to include(batch1.name)
      expect(response.body).to_not include(batch2.name)
    end

    it 'does not work for unauthenticated users' do
      batch = FactoryGirl.build(:batch, user: nil, recipe: recipe)

      get "/api/v1/batches/#{batch.id}", format: :json

      expect(response.status).to be(401)
    end
  end

  describe '#create' do
    it 'creates a new batch belonging to the current user' do
      login_as user

      batch = FactoryGirl.build(:batch, user: nil, recipe: recipe)

      post '/api/v1/batches/', { batch: { name: batch.name, recipe: batch.recipe.title } }, format: :json

      expect(response.status).to be(201)
    end

    it 'does not work for unauthenticated users' do
      batch = FactoryGirl.build(:batch, user: nil, recipe: recipe)

      post '/api/v1/batches/', { batch: { name: batch.name, recipe_id: batch.recipe.id } }, format: :json

      expect(response.status).to_not be(201)
    end
  end

  describe '#update' do
    it 'updates a given batch with new attributes' do
      batch = FactoryGirl.create(:batch, user: user, recipe: recipe)
      login_as user

      expect(batch.end_date).to be(nil)

      end_date = Date.today

      patch "/api/v1/batches/#{batch.id}", { batch: { end_date: end_date } }, format: :json

      json = JSON.parse(response.body)
      expect(response.status).to be(200)
      expect(json['batch']['end_date']).to eq(end_date.to_s)
    end

    it 'does not work for unauthenticated users' do
      batch = FactoryGirl.create(:batch, user: user, recipe: recipe)

      end_date = Date.today
      expect(batch.end_date).to be(nil)

      patch "/api/v1/batches/#{batch.id}", { batch: { end_date: end_date } }, format: :json

      expect(response.status).to_not be(200)
      expect(batch.end_date).to be(nil)
    end
  end
end
