class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :title, :sweetness, :variety
end
