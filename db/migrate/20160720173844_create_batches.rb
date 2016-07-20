class CreateBatches < ActiveRecord::Migration
  def change
    create_table :batches do |t|
      t.belongs_to :user, null: false
      t.belongs_to :recipe, null: false
      t.string :name, null: false
      t.text :description
      t.date :start_date
      t.date :end_date
      t.float :initial_hydrometer
      t.float :final_hydrometer
      t.float :approx_abv
      t.text :notes

      t.timestamps null: false
    end
  end
end
