require 'rails_helper'

RSpec.describe Recipe, type: :model do
  it { should belong_to :user }
  it { should validate_presence_of :user }

  it { should have_many(:ingredients) }
  it { should have_many(:steps) }

  it { should have_valid(:title).when('Basic Mead', 'Strawberry Pyment No. 8') }
  it { should_not have_valid(:title).when('', nil) }

  it { should have_valid(:sweetness).when('Sweet', 'Semi-Sweet', 'Dry') }
  it { should_not have_valid(:sweetness).when('', nil, 'something else') }

  it { should have_valid(:variety).when('Basic', 'Pyment', 'Melomel') }
  it { should_not have_valid(:variety).when('', nil, 'something else') }

  it { should have_valid(:success_count).when(0, 1, 50) }
  it { should_not have_valid(:success_count).when(-1, -50, 0.5) }

  it { should have_valid(:failure_count).when(0, 1, 50) }
  it { should_not have_valid(:failure_count).when(-1, -50, 0.5) }
end
