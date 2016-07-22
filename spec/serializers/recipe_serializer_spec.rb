require 'rails_helper'

describe RecipeSerializer do
  it "creates JSON for the API" do
    serializer = RecipeSerializer.new FactoryGirl.create(:recipe)
    expect(serializer.to_json).to include('{"recipe":{"id":1,"title":"Basic Mead","sweetness":"Semi-Sweet","variety":"Mead"')
  end
end
