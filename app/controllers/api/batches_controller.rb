class Api::BatchesController < ApiController
  before_action :authenticate_user!

  def index
    batches = Batch.where(user: current_user).order("start_date ASC")
    render json: batches, include: :recipe, status: :ok
  end

  def create
    recipe = Recipe.find_by(title: params[:batch]['recipe'])
    batch = Batch.new(batch_params)
    batch.recipe = recipe
    batch.user = current_user

    if batch.save
      render json: { batch: batch }, status: :created
    else
      render json: { errors: batch.errors }, status: :unprocessable_entity
    end
  end

  private

  def batch_params
    params.require(:batch).permit(:name, :description)
  end
end
