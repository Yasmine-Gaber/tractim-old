Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'users/index'
      post 'users/create'
      get 'users/show/:id', to: 'users#show'
      get 'users/edit/:id', to: 'users#edit'
      put 'users/update/:id', to: 'users#update'
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
