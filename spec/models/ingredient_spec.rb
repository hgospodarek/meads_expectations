require 'rails_helper'

RSpec.describe Ingredient, type: :model do
  it { should have_valid(:name).when('honey', 'water') }
  it { should_not have_valid(:name).when('', nil) }

  it { should belong_to :recipe }
  it { should belong_to :batch }

  it { should have_valid(:amount).when(1, 0.5) }
  it { should_not have_valid(:amount).when(nil, 0, -1, -0.5) }

  it { should have_valid(:unit).when('cups', 'teaspoons') }
  it { should_not have_valid(:unit).when('', nil) }

end
