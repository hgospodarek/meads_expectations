class RecipesController < ApplicationController
  before_action :authenticate_user!

  def index
  end

  def show
    @recipe = Recipe.find(params[:id])
    @ingredients = @recipe.ingredients.order("name ASC")
    @steps = @recipe.steps.order("step_num ASC")
  end
end
