class BatchPhoto < ActiveRecord::Base
  belongs_to :batch
  validates_presence_of :batch

  mount_uploader :batch_photo, BatchPhotoUploader
end
