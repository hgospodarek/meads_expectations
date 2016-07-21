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
  validates :approx_abv, numericality: { greater_than: 0 }, allow_nil: true

  def approx_abv
    if initial_hydrometer && final_hydrometer
      return (initial_hydrometer - final_hydrometer) / 0.00736
    else
      return nil
    end
  end

  def current_step
    incomplete = steps.select {|s| s.completed? == false}
    return incomplete.first
  end

  def completed_steps
    return steps.select {|s| s.completed? == true}
  end
end
