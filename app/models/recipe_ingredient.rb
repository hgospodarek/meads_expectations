class RecipeIngredient < ActiveRecord::Base
  belongs_to :recipe
  validates_presence_of :recipe

  belongs_to :ingredient
  validates_presence_of :ingredient

  validates :amount, presence: true, numericality: { greater_than: 0 }
  validates :unit, presence: true
end
