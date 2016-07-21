class Batch < ActiveRecord::Base
  belongs_to :user
  validates_presence_of :user

  belongs_to :recipe
  validates_presence_of :recipe

  validates :name, presence: true
  validates :initial_hydrometer, numericality: { greater_than: 0 },
  allow_nil: true
  validates :final_hydrometer, numericality: { greater_than: 0 },
  allow_nil: true
  validates :approx_abv, numericality: { greater_than: 0 }, allow_nil: true

  # def approx_abv
  #   if initial_hydrometer && final_hydrometer
  #     return (initial_hydrometer - final_hydrometer) / 0.00736
  #   else
  #     return 'Not yet calculated'
  #   end
  # end

  def ingredients
    if recipe.ingredients
      return recipe.ingredients
    else
      return "This batch's recipe doesn't list any ingredients."
    end
  end

  def steps
    if recipe.steps
      return recipe.steps
    else
      return "This batch's recipe doesn't list any steps."
    end
  end
end
