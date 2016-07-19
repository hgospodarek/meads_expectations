Rails.application.routes.draw do
  devise_for :users
  root 'welcome#index'

  resources :recipes, only: [:index, :show, :new, :create]

  namespace :api do
    resources :recipes, only: [:create]
      resources :ingredients, only: [:create, :index, :destroy]
      resources :steps, only: [:create, :index, :destroy]
  end
end
