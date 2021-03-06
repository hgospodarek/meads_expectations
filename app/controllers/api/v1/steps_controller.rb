class Api::V1::StepsController < ApiController
  before_action :authenticate_user!

  def create
    step = Step.new(step_params)
    if step.save
      render json: { step: step}, status: :created
    else
      render json: { errors: step.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    step = Step.find(params[:id])
    step.destroy
    head :no_content
  end

  private

  def step_params
    params.require(:step).permit(:action, :batch_id, :recipe_id)
  end
end
