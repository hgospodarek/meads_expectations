require 'rails_helper'

RSpec.describe Batch, type: :model do
  it { should belong_to :user }
  it { should validate_presence_of :user }

  it { should belong_to :recipe }
  it { should validate_presence_of :recipe }

  it { should have_many(:ingredients).dependent(:destroy) }
  it { should have_many(:steps).dependent(:destroy) }

  it { should have_valid(:name).when('Batch 1', 'My Hopefully Not Awful Mead') }
  it { should_not have_valid(:name).when('', nil) }

  it { should have_valid(:initial_hydrometer).when(1, 1.5, 1.094) }
  it { should_not have_valid(:initial_hydrometer).when(-5, 'wordswordswords') }

  it { should have_valid(:final_hydrometer).when(1, 1.5, 1.094) }
  it { should_not have_valid(:final_hydrometer).when(-5, 'wordswordswords') }

  describe '#approx_abv' do
    it 'should return nil if either initial or final hydrometer readings are blank' do
      user = FactoryGirl.create(:user)
      recipe = FactoryGirl.create(:recipe)
      batch = FactoryGirl.create(:batch, user: user, recipe: recipe, final_hydrometer: nil)

      expect(batch.approx_abv).to eq(nil)
    end

    it 'should calculate the approximate abv if both readings are present' do
      user = FactoryGirl.create(:user)
      recipe = FactoryGirl.create(:recipe)
      batch = FactoryGirl.create(:batch, user: user, recipe: recipe, initial_hydrometer: 1.08, final_hydrometer: 1.01)

      expect(batch.approx_abv).to eq(9.51)
    end
  end

  describe '#current_step' do
    it 'returns the first incomplete step of the batch' do
      user = FactoryGirl.create(:user)
      recipe = FactoryGirl.create(:recipe)
      batch = FactoryGirl.create(:batch, user: user, recipe: recipe, initial_hydrometer: 1.08, final_hydrometer: 1.01)

      step1 = FactoryGirl.create(:step, batch: batch, action: 'Pour honey', completed?: true, updated_at: Time.now)

      step2 = FactoryGirl.create(:step, batch: batch, action: 'Mix it up')

      expect(batch.current_step).to eq(step2)
    end
  end

  describe '#completed_steps' do
    it 'returns a batches completed steps' do
      user = FactoryGirl.create(:user)
      recipe = FactoryGirl.create(:recipe)
      batch = FactoryGirl.create(:batch, user: user, recipe: recipe, initial_hydrometer: 1.08, final_hydrometer: 1.01)

      step1 = FactoryGirl.create(:step, batch: batch, action: 'Pour honey', completed?: true, updated_at: Time.now)

      step2 = FactoryGirl.create(:step, batch: batch, action: 'Mix it up', completed?: true)

      expect(batch.completed_steps).to eq([step1, step2])
    end
  end

  describe '#last_step' do
    it 'should return the last step of a batch' do
      user = FactoryGirl.create(:user)
      recipe = FactoryGirl.create(:recipe)
      batch = FactoryGirl.create(:batch, user: user, recipe: recipe, initial_hydrometer: 1.08, final_hydrometer: 1.01)

      step1 = FactoryGirl.create(:step, batch: batch, action: 'Pour honey')

      step2 = FactoryGirl.create(:step, batch: batch, action: 'Mix it up')

      expect(batch.last_step).to eq(step2)
    end
  end
end
