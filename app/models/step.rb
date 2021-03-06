class Step < ActiveRecord::Base
  belongs_to :recipe, inverse_of: :steps
  belongs_to :batch, inverse_of: :steps

  validates :action, presence: true
end
