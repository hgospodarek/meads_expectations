class RecipesController < ApplicationController
  before_action :authenticate_user!

  def index
    @recipes = Recipe.where(user: current_user).order("title ASC")
  end

  def show
    @recipe = Recipe.find(params[:id])
    @recipe.steps.order("step_num ASC")
  end
end
