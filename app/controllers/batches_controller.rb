class BatchesController < ApplicationController
  before_action :authenticate_user!

  def index
  end

  def show
    @batch = Batch.find(params[:id])
  end

end
