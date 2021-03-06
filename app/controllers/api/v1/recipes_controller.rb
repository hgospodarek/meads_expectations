class Api::V1::RecipesController < ApiController
  before_action :authenticate_user!

  def index
    recipes = Recipe.order('lower(title)').where(user: current_user)
    render json: recipes, status: :ok
  end

  def create
    recipe = Recipe.new(recipe_params)
    recipe.user = current_user
    if recipe.save
      render json: { recipe: recipe }, status: :created
    else
      render json: { errors: recipe.errors.values },
                    status: :unprocessable_entity
    end
  end

  def show
    recipe = Recipe.find(params[:id])
    render json: recipe, status: :ok
  end

  def update
    recipe = Recipe.find(params[:id])
    if recipe.update(recipe_params)
      render json: recipe, include: :recipe, status: :ok
    else
      render json: { errors: recipe.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    recipe = Recipe.find(params[:id])
    recipe.destroy
    head :no_content
  end

  private

  def recipe_params
    params.require(:recipe).permit(:title, :variety, :sweetness,
                                  :success_count, :failure_count,
                                  :ingredients_attributes =>
                                  [:name, :amount, :unit],
                                  :steps_attributes => [:action])
  end
end
