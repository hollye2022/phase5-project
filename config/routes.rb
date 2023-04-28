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

  resources :streaks do
    member do
      post 'increment_count'
    end
  end

  resources :users, only:[:show] do
    resources :notes, only:[:show, :index]
  end

end
