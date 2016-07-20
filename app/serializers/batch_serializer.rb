class BatchSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :recipe, :start_date, :end_date
end
