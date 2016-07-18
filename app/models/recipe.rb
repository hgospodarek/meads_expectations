class Recipe < ActiveRecord::Base
  belongs_to :user
  validates_presence_of :user

  has_many :recipe_ingredients
  has_many :ingredients, through: :recipe_ingredients

  accepts_nested_attributes_for :recipe_ingredients, reject_if: :all_blank, allow_destroy: true

  VARIETIES = ['Basic', 'Melomel', 'Braggot', 'Hydromel', 'Pyment', 'Cyser', 'Metheglin', 'Rhodomel', 'Sack Mead', 'Show Mead', 'Great Mead', 'Sparkling Mead', 'Morat', 'Hippocras', 'Omphacomel', 'Oxymel', 'Acerglyn', 'Bochet', 'Capsicumel', 'Black Mead', 'Mulled Mead', 'Tej', 'Acan', 'Gverc', 'Dwojniak', 'Poltorak', 'Czworniak', 'Sima', 'Pitarilla', 'Medica', 'Dandaghare', 'Medovina', 'Medovukha', 'iQhilika'].freeze

  validates :title, presence: true
  validates :sweetness, presence: true, inclusion: { in: %w(Sweet Semi-Sweet Dry) }
  validates :variety, presence: true, inclusion: { in: VARIETIES }
  validates :success_count, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :failure_count, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }

end