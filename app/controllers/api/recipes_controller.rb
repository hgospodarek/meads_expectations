class Api::RecipesController < ApiController
  def create
    binding.pry
    recipe = Recipe.new(recipe_params)
    binding.pry
    recipe.user = current_user
    binding.pry
    if recipe.save
      render json: { recipe: recipe }, status: :created
    else
      render json: {errors: recipe.errors}, status: :unprocessable_entity
    end
  end

  private

  def recipe_params
    params.require(:recipe).permit(:title, :variety, :sweetness, :ingredients_attributes => [:name, :amount, :unit], :steps_attributes => [:action, :step_num])
  end
end
