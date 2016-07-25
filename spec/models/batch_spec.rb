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

  let(:user) { FactoryGirl.create(:user) }
  let(:recipe) { FactoryGirl.create(:recipe) }
  let(:batch) { FactoryGirl.create(:batch, user: user, recipe: recipe) }

  describe '#approx_abv' do
    it 'should return nil if either initial or final hydrometer
        readings are blank' do
      batch.final_hydrometer = nil
      expect(batch.approx_abv).to eq(nil)
    end

    it 'should calculate the approximate abv if both readings are present' do
      batch.initial_hydrometer = 1.08
      batch.final_hydrometer = 1.01
      expect(batch.approx_abv).to eq(9.51)
    end
  end

  describe '#current_step' do
    it 'returns the first incomplete step of the batch' do

      step1 = FactoryGirl.create(:step, batch: batch, action: 'Pour honey',
              completed?: true, updated_at: Time.now)

      step2 = FactoryGirl.create(:step, batch: batch, action: 'Mix it up')

      expect(batch.current_step).to eq(step2)
    end
  end

  describe '#completed_steps' do
    it 'returns a batches completed steps' do
      step1 = FactoryGirl.create(:step, batch: batch, action: 'Pour honey',
              completed?: true)

      step2 = FactoryGirl.create(:step, batch: batch, action: 'Mix it up',
              completed?: true)

      expect(batch.completed_steps).to eq([step1, step2])
    end
  end

  describe '#last_step' do
    it 'should return the last step of a batch' do

      step1 = FactoryGirl.create(:step, batch: batch, action: 'Pour honey')

      step2 = FactoryGirl.create(:step, batch: batch, action: 'Mix it up')

      expect(batch.last_step).to eq(step2)
    end
  end

  describe '#recipe_steps' do
    it "returns the steps of a batch's recipe" do
      step1 = FactoryGirl.create(:step, recipe: recipe, action: 'Pour honey')

      step2 = FactoryGirl.create(:step, recipe: recipe, action: 'Mix it up')

      expect(batch.recipe_steps).to eq([step1, step2])
    end
  end

  describe "#completed_recipe_steps" do
    it "returns the completed steps that came from a batch's recipe" do

      recipe_step1 = FactoryGirl.create(:step, recipe: recipe, action: 'Pour honey')

      recipe_step2 = FactoryGirl.create(:step, recipe: recipe, action: 'Mix it up')

      completed_step = FactoryGirl.create(:step, batch: batch, action: 'Pour honey',
              completed?: true, recipe: nil)

      incomplete_step = FactoryGirl.create(:step, batch: batch, action: 'Mix it up', recipe: nil)

      not_recipe_step = FactoryGirl.create(:step, batch: batch, action: 'Pitch the yeast', recipe: nil)

      expect(batch.completed_recipe_steps).to eq([completed_step])
    end
  end

  describe "#new_steps" do
    it "returns a batch's steps that were not in the original recipe" do
      recipe_step1 = FactoryGirl.create(:step, recipe: recipe, action: 'Pour honey')

      recipe_step2 = FactoryGirl.create(:step, recipe: recipe, action: 'Mix it up')

      recipe_step3 = FactoryGirl.create(:step, recipe: recipe, action: 'Put in some raisins')


      completed_step = FactoryGirl.create(:step, batch: batch, action: 'Pour honey',
              completed?: true, recipe: nil)

      incomplete_step = FactoryGirl.create(:step, batch: batch, action: 'Mix it up', recipe: nil)

      not_recipe_step = FactoryGirl.create(:step, batch: batch, action: 'Pitch the yeast', recipe: nil)

      not_recipe_step2 = FactoryGirl.create(:step, batch: batch, action: 'Wait forever', recipe: nil)


      expect(batch.new_steps).to eq([not_recipe_step, not_recipe_step2])
    end
  end
end
