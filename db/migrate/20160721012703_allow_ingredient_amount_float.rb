class AllowIngredientAmountFloat < ActiveRecord::Migration
  def change
    change_column :ingredients, :amount, :float
  end
end
