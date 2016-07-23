class RecipesController < ApplicationController
  before_action :authenticate_user!

  def index
  end

  def show
    @recipe = Recipe.find(params[:id])
    @ingredients = @recipe.ingredients.order("name ASC")
    @steps = @recipe.steps
  end

  def destroy
    @recipe = Recipe.find(params[:id])
    @recipe.destroy
    redirect_to root_path, flash: { notice: "Guess you didn't like that one." }
  end
end
