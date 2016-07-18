class RecipesController < ApplicationController
  before_action :authenticate_user!

  def index
    @recipes = Recipe.where(user: current_user).order("title ASC")
  end
end
