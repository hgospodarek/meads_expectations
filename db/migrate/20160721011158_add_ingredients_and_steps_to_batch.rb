class AddIngredientsAndStepsToBatch < ActiveRecord::Migration
  def change
    change_column_null :ingredients, :recipe_id, true
    change_column_null :steps, :recipe_id, true
    add_column :ingredients, :batch_id, :integer
    add_column :steps, :batch_id, :integer
  end
end
