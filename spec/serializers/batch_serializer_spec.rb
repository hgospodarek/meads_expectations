require 'rails_helper'

describe BatchSerializer do
  let(:recipe) { FactoryGirl.create(:recipe) }
  it "creates JSON for the API" do
    serializer = BatchSerializer.new FactoryGirl.create(:batch, recipe: recipe)
    expect(serializer.to_json).to include('{"batch":{"id":1,"name":"Batch 1","recipe":{"id":1,"user_id":1')
  end
end
