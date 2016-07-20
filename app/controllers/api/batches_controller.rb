class Api::BatchesController < ApiController
  before_action :authenticate_user!

  def index
    batches = Batch.where(user: current_user).order("start_date ASC")
    render json: batches, status: :ok
  end
end
