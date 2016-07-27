class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :title, :sweetness, :variety, :ingredients, :steps, :success_count, :failure_count
end
