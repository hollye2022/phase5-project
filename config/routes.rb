Rails.application.routes.draw do
  resources :notes
  resources :streaks, only: [:destroy, :create]
  resources :habits, only: [:create, :destroy, :show, :index]
  resources :users, only: [:show, :create, :index, :me]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  get "/test", to: "application#test"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "/me", to: "users#me"

  # Habits API endpoints
  # post "/habits", to: "habits#create"
  # delete "/habits", to: "habits#destroy"

  # Streaks API endpoints
  # delete '/streaks/:id', to: 'streaks#destroy'

  # Increment the streak count
  # example: /streaks/123/increment_count
  resources :streaks do
    member do
      post 'increment_count'
    end
  end

end
