require 'rails_helper'

RSpec.describe 'Recipes', type: :request do
  let(:user) { FactoryGirl.create(:user) }

  describe '#index' do
    it 'returns an error if a user is not signed in' do
      FactoryGirl.create_list(:recipe, 5, user: user)

      get '/api/v1/recipes', format: :json
      json = JSON.parse(response.body)

      expect(response.status).to be(401)
    end

    it "returns a list of the user's recipes if the user is signed in" do
      recipes = FactoryGirl.create_list(:recipe, 5, user: user)
      login_as user

      get '/api/v1/recipes', format: :json
      json = JSON.parse(response.body)

      expect(response.status).to be(200)

      recipes.each do |recipe|
        expect(response.body).to include(recipe.title)
      end
    end
  end

  describe '#show' do
    it 'returns an error if a user is not signed in' do
      recipes = FactoryGirl.create_list(:recipe, 5, user: user)

      get "/api/v1/recipes/#{recipes.first.id}", format: :json
      json = JSON.parse(response.body)

      expect(response.status).to be(401)
    end
  end

  describe '#show' do
    it 'retrns a single recipe' do
      recipe1 = FactoryGirl.create(:recipe, user: user, title: "Recipe 1")
      recipe2 = FactoryGirl.create(:recipe, user: user, title: "Recipe 2")

      login_as user

      get "/api/v1/recipes/#{recipe1.id}", format: :json
      json = JSON.parse(response.body)

      expect(response.status).to be(200)
      expect(response.body).to include(recipe1.title)
      expect(response.body).to_not include(recipe2.title)
    end
  end

  describe '#create' do
    it 'creates a new recipe belonging to the current user' do
      login_as user

      recipe = FactoryGirl.build(:recipe, user: nil)

      post '/api/v1/recipes/', { recipe: {title: recipe.title,
        sweetness: recipe.sweetness, variety: recipe.variety } }, format: :json

      expect(response.status).to be(201)
    end

    it 'does not work for unauthenticated users' do
      recipe = FactoryGirl.build(:recipe, user: nil)
      headers = { "ACCEPT" => "application/json" }

      post '/api/v1/recipes/', { recipe: { title: recipe.title,
        sweetness: recipe.sweetness, variety: recipe.variety} }, headers

      expect(response.status).to be(401)
    end

    it 'requires at least the recipe title, sweetness, and variety' do
      login_as user
      recipe = FactoryGirl.build(:recipe, user: nil)

      post '/api/v1/recipes/', { recipe: { title: recipe.title } },
      format: :json

      expect(response.status).to be(422)
    end
  end

  describe '#update' do
    it 'updates the given recipe with new attributes' do
      recipe = FactoryGirl.create(:recipe, user: user)
      login_as user

      expect(recipe.success_count).to be(0)

      patch "/api/v1/recipes/#{recipe.id}", { recipe: { success_count: 1 } }, format: :json

      json = JSON.parse(response.body)
      expect(response.status).to be(200)
      expect(json['recipe']['success_count']).to eq(1)
    end

    it 'should not remove any required information' do
      login_as user
      recipe = FactoryGirl.create(:recipe, user: user)

      patch "/api/v1/recipes/#{recipe.id}", { recipe: { title: nil } },
      format: :json

      expect(response.status).to be(422)
    end

    it 'does not work for unauthenticated users' do
      recipe = FactoryGirl.create(:recipe, user: user)

      expect(recipe.success_count).to be(0)

      patch "/api/v1/recipes/#{recipe.id}", { recipe: { success_count: 1 } }, format: :json

      expect(response.status).to_not be(200)
    end
  end

  describe '#destroy' do
    it 'deletes the given recipe' do
      recipes = FactoryGirl.create_list(:recipe, 5, user: user)
      login_as user

      initial_recipes = Recipe.all
      expect(initial_recipes.size).to eq(5)

      delete "/api/v1/recipes/#{recipes.first.id}", format: :json

      final_recipes = Recipe.all
      expect(final_recipes.size).to eq(4)
    end

    it 'does not work for unauthenticated users' do
      recipes = FactoryGirl.create_list(:recipe, 5, user: user)

      initial_recipes = Recipe.all
      expect(initial_recipes.size).to eq(5)

      delete "/api/v1/recipes/#{recipes.first.id}", format: :json

      final_recipes = Recipe.all
      expect(final_recipes.size).to eq(5)
    end
  end
end
