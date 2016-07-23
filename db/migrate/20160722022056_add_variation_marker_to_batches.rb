class AddVariationMarkerToBatches < ActiveRecord::Migration
  def change
    add_column :batches, :variation, :boolean, default: false
  end
end
