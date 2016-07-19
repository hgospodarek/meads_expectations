class CreateRecipeIngredients < ActiveRecord::Migration
  def change
    create_table :recipe_ingredients do |t|
      t.belongs_to :recipe, null: false
      t.belongs_to :ingredient, null: false
      t.integer :amount, null: false
      t.string :unit, null: false
    end
  end
end
