class Batch < ActiveRecord::Base
  belongs_to :user
  validates_presence_of :user

  belongs_to :recipe
  validates_presence_of :recipe

  has_many :ingredients, dependent: :destroy, inverse_of: :batch
  has_many :steps, dependent: :destroy, inverse_of: :batch

  accepts_nested_attributes_for :ingredients, :steps

  validates :name, presence: true
  validates :initial_hydrometer, numericality: { greater_than: 0 },
  allow_nil: true
  validates :final_hydrometer, numericality: { greater_than: 0 },
  allow_nil: true

  def approx_abv
    if initial_hydrometer && final_hydrometer
      result = (initial_hydrometer - final_hydrometer) / 0.00736

      result.round(2)
    else
      nil
    end
  end

  def current_step
    incomplete = steps.select { |s| s.completed? == false }

    incomplete.first
  end

  def completed_steps
    steps.select { |s| s.completed? == true }
  end

  def last_step
    steps.max_by { |s| s.created_at }
  end

  def original_steps
    steps.select { |s| s.recipe_id }
  end

  def new_steps
    steps.select { |s| s.recipe_id.nil? }
  end
end
