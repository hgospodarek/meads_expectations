class Step < ActiveRecord::Base
  belongs_to :recipe
  validates_presence_of :recipe

  validates :action, presence: true
  validates :step_num, presence: true, numericality: { greater_than: 0 }
end