class Ingredient < ActiveRecord::Base
  belongs_to :recipe
  validates_presence_of :recipe

  validates :name, presence: true
  validates :amount, presence: true, numericality: { greater_than: 0 }
  validates :unit, presence: true

end