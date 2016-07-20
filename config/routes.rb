Rails.application.routes.draw do
  devise_for :users
  root 'welcome#index'

  resources :recipes, only: [:index, :show]
  resources :batches, only: [:index]

  namespace :api do
    resources :batches, only: [:index]
    resources :recipes, only: [:index, :create] do
      resources :ingredients, only: [:create, :index, :destroy]
      resources :steps, only: [:create, :index, :destroy]
    end
  end
end
