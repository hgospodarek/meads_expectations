class BatchSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :recipe, :start_date, :end_date, :ingredients, :steps, :approx_abv, :initial_hydrometer, :final_hydrometer, :notes, :current_step, :completed_steps, :variation
end
