Rails.application.routes.draw do
  root "snake#index"
  post "/score/create", to: "snake#create", as: "create_player_score"

end
