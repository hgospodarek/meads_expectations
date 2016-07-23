class AddIndexToRecipeNamePerUser < ActiveRecord::Migration
  def up
    add_index :recipes, [:user_id, :title], :unique => true
  end

  def down
    remove_index :recipes, :column => [:user_id, :title]
  end
end
