class Recipe < ActiveRecord::Base
  belongs_to :user
  validates_presence_of :user

  has_many :ingredients, dependent: :destroy, inverse_of: :recipe
  has_many :steps, dependent: :destroy, inverse_of: :recipe

  has_many :batches, dependent: :destroy

  accepts_nested_attributes_for :ingredients, :steps

  VARIETIES = ['Mead', 'Melomel', 'Braggot', 'Hydromel', 'Pyment',
    'Cyser', 'Metheglin', 'Rhodomel', 'Sack Mead', 'Show Mead', 'Great Mead',
    'Sparkling Mead', 'Morat', 'Hippocras', 'Omphacomel', 'Oxymel', 'Acerglyn',
    'Bochet', 'Capsicumel', 'Black Mead', 'Mulled Mead', 'Tej', 'Acan',
    'Gverc', 'Dwojniak', 'Poltorak', 'Czworniak', 'Sima', 'Pitarilla',
    'Medica', 'Dandaghare', 'Medovina', 'Medovukha', 'iQhilika'].freeze

  validates :title, presence: true

  validates :sweetness, presence: true,
  inclusion: { in: %w(Sweet Semi-Sweet Dry) }

  validates :variety, presence: true, inclusion: { in: VARIETIES }

  validates :success_count, presence: true,
  numericality: { only_integer: true, greater_than_or_equal_to: 0 }

  validates :failure_count, presence: true,
  numericality: { only_integer: true, greater_than_or_equal_to: 0 }

  validates :title, uniqueness: { scope: :user,
    message: "You'll only frustrate yourself later if
    you make two recipes with the same name" }

  def last_step
    steps.max_by { |s| s.created_at }
  end

end
