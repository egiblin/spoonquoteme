Rails.application.routes.draw do
  resources :pages, only: [ :index ]

  root to: "pages#index"

  namespace :api, defaults: { format: :json } do
    resources :quotes, only: [ :show, :create ]
  end

end
