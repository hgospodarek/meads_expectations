class BatchSerializer < ActiveModel::Serializer
  attributes :id, :name, :recipe, :end_date,
  :ingredients, :steps, :approx_abv, :initial_hydrometer, :final_hydrometer,
  :current_step, :completed_steps, :variation, :last_step,
  :created_at, :updated_at, :original_steps, :new_steps
  has_one :recipe, serializer: RecipeSerializer
end
