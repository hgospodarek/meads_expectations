class BatchesController < ApplicationController
  before_action :authenticate_user!

  def index
  end

  def show
    @batch = Batch.find(params[:id])
  end

  def destroy
    batch = Batch.find(params[:id])
    batch.destroy
    redirect_to root_path,
    flash: { notice: "Batch deleted. Harsh, man. Harsh." }
  end
end
