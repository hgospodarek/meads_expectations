class RenameColumnType < ActiveRecord::Migration
  def change
    rename_column :recipes, :type, :variety
  end
end
