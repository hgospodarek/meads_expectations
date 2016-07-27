Rails.application.routes.draw do
  devise_for :users
  root 'welcome#index'

  resources :recipes, only: [:index, :show, :destroy]
  resources :batches, only: [:index, :show, :destroy]

  namespace :api do
    namespace :v1 do
      resources :batches, only: [:index, :show, :create, :update] do
        resources :steps, only: [:create, :update, :destroy]
      end
      resources :recipes, only: [:index, :create, :show, :update, :destroy] do
        resources :ingredients, only: [:create, :index, :destroy]
        resources :steps, only: [:create, :index, :destroy]
      end
    end
  end
end
