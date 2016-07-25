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

  def recipe_steps
    recipe.steps
  end

  def completed_recipe_steps
    i = 0
    result = []
    while (i < recipe_steps.length) && (i < completed_steps.length)
      if (recipe_steps[i].action == completed_steps[i].action)
        result.push(completed_steps[i])
      end
      i += 1
    end
    result
  end

  def new_steps
    i = 0
    result = []
    while (i < steps.length)
      if (i > recipe_steps.length - 1) || (steps[i].action != recipe_steps[i].action)
        result.push(steps[i])
      end
      i += 1
    end
    result
  end
end
