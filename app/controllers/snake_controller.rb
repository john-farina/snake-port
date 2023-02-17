class SnakeController < ApplicationController
  def index
    @highscores =  PlayerScore.all.order( 'score DESC' )
    @props = {
      form_authenticity_token:  form_authenticity_token,
      highscores: ActiveModel::SerializableResource.new(PlayerScore.all).as_json
    }
  end

  def create
    @player_score = PlayerScore.new(params.permit(:name, :score))

    if @player_score.save
      puts "Saved User Score"
    else
      puts "Error Saving User Score"
    end
  end
end
