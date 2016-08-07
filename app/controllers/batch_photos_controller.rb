class BatchPhotosController < ApplicationController
  before_action :authenticate_user!

  def create
    @batch = Batch.find(params[:batch_id])
    @batch_photo = BatchPhoto.new(batch_photo_params)
    @batch_photo.batch = @batch

    if @batch_photo.save
      redirect_to batch_path(@batch), notice: "Photo uploaded."
    else
      redirect_to batch_path(@batch), notice: "Something went wrong."
    end
  end

  private

  def batch_photo_params
    params.require(:batch_photo).permit(:batch_photo, :caption)
  end
end
