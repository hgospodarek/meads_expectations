require 'rails_helper'

RSpec.describe Ingredient, type: :model do
  it { should have_valid(:name).when('honey', 'water') }
  it { should_not have_valid(:name).when('', nil) }

  it { should have_many :recipe_ingredients }
  it { should have_many(:recipes) }
end
