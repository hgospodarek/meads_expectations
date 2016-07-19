class CreateSteps < ActiveRecord::Migration
  def change
    create_table :steps do |t|
      t.belongs_to :recipe, null: false
      t.string :action, null: false
      t.integer :step_num, null: false
      t.boolean :completed?, default: false

      t.timestamps null: false
    end
  end
end
