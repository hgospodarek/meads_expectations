class CreateRecipes < ActiveRecord::Migration
  def change
    create_table :recipes do |t|
      t.belongs_to :user, null: false
      t.string :title, null: false
      t.string :sweetness, null: false
      t.string :type, null: false
      t.integer :success_count, default: 0
      t.integer :failure_count, default: 0
      t.text :notes
      t.timestamps null: false
    end
  end
end
