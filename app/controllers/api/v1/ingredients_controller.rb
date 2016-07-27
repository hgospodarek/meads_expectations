class Api::V1::IngredientsController < ApiController
  before_action :authenticate_user!

  def create
    ingredient = Ingredient.new(ingredient_params)
    if ingredient.save
      render json: { ingredient: ingredient}, status: :created
    else
      render json: { errors: ingredient.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    ingredient = Ingredient.find(params[:id])
    ingredient.destroy
    head :no_content
  end

  private

  def ingredient_params
    params.require(:ingredient).permit(:name, :unit, :amount, :batch_id, :recipe_id)
  end
end
