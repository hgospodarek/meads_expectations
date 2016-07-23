Rails.application.routes.draw do
  devise_for :users
  root 'welcome#index'

  resources :recipes, only: [:index, :show, :destroy]
  resources :batches, only: [:index]

  namespace :api do
    resources :batches, only: [:index, :create]
    resources :recipes, only: [:index, :create, :destroy] do
      resources :ingredients, only: [:create, :index, :destroy]
      resources :steps, only: [:create, :index, :destroy]
    end
  end
end
