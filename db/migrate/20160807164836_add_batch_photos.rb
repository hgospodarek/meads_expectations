class AddBatchPhotos < ActiveRecord::Migration
  def change
    create_table :batch_photos do |t|
      t.belongs_to :batch, null: false
      t.string :batch_photo
      t.string :caption

      t.timestamps null: false
    end
  end
end
