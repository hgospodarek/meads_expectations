class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :title, :sweetness, :variety, :ingredients, :steps
end
