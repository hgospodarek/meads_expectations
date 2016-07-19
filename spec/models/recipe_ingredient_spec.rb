require 'rails_helper'

RSpec.describe RecipeIngredient, type: :model do
  it { should belong_to :ingredient }
  it { should validate_presence_of :ingredient }

  it { should belong_to :recipe }
  it { should validate_presence_of :recipe }

  it { should have_valid(:amount).when(1, 0.5) }
  it { should_not have_valid(:amount).when(nil, 0, -1, -0.5) }

  it { should have_valid(:unit).when('cups', 'teaspoons') }
  it { should_not have_valid(:unit).when('', nil) }
end
