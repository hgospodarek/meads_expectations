class Api::BatchesController < ApiController
  before_action :authenticate_user!

  def index
    batches = Batch.where(user: current_user).order("created_at ASC")
    render json: batches, include: :recipe, status: :ok
  end

  def create
    recipe = Recipe.find_by(title: params[:batch]['recipe'], user: current_user)
    batch = Batch.new(batch_params)
    batch.recipe = recipe
    batch.user = current_user

    if batch.save
      copy_recipe_attributes(batch, recipe)
      render json: { batch: batch }, status: :created
    else
      render json: { errors: batch.errors }, status: :unprocessable_entity
    end
  end

  def show
    batch = Batch.find(params[:id])
    render json: batch, include: :recipe, status: :ok
  end

  def update
    batch = Batch.find(params[:id])
    if batch.update(batch_params)
      render json: batch, include: :recipe, status: :ok
    else
      binding.pry
      render json: { errors: batch.errors }, status: :unprocessable_entity
    end
  end

  private

  def batch_params
    params.require(:batch).permit(:name, :description, :variation, :end_date, :initial_hydrometer, :final_hydrometer, :steps_attributes => [:id, :action, :completed?])
  end

  def copy_recipe_attributes(batch, recipe)
    unless recipe.ingredients.empty?
      recipe.ingredients.each do |ingredient|
        Ingredient.create(batch: batch, amount: ingredient.amount,
        unit: ingredient.unit, name: ingredient.name)
      end
    end
    unless recipe.steps.empty?
      recipe.steps.each do |step|
        Step.create(batch: batch, action: step.action)
      end
    end
  end
end
