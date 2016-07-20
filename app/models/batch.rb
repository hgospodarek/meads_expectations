class Batch < ActiveRecord::Base
  belongs_to :user
  validates_presence_of :user

  belongs_to :recipe
  validates_presence_of :recipe

  validates :name, presence: true
  validates :initial_hydrometer, numericality: { greater_than: 0 }
  validates :final_hydrometer, numericality: { greater_than: 0 }
  validates :approx_abv, numericality: { greater_than: 0 }

  def approx_abv
    if initial_hydrometer && final_hydrometer
      return (initial_hydrometer - final_hydrometer) / 0.00736
    else
      return 'Not yet calculated'
    end
  end
end
