require 'rails_helper'

RSpec.describe Batch, type: :model do
  it { should belong_to :user }
  it { should validate_presence_of :user }

  it { should belong_to :recipe }
  it { should validate_presence_of :recipe }

  it { should have_valid(:name).when('Batch 1', 'My Hopefully Not Awful Mead') }
  it { should_not have_valid(:name).when('', nil) }

  it { should have_valid(:initial_hydrometer).when(1, 1.5, 1.094) }
  it { should_not have_valid(:initial_hydrometer).when(-5, 'wordswordswords') }

  it { should have_valid(:final_hydrometer).when(1, 1.5, 1.094) }
  it { should_not have_valid(:final_hydrometer).when(-5, 'wordswordswords') }
end
