class RedoRecipeAssociations < ActiveRecord::Migration
  def change
    add_column :ingredients, :recipe_id, :integer, null: false
    add_column :ingredients, :amount, :integer, null: false
    add_column :ingredients, :unit, :string, null: false

    drop_table :recipe_ingredients
  end
end
