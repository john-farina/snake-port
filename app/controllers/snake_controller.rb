class SnakeController < ApplicationController
  def index
    @highscores =  PlayerScore.all.order( 'score DESC' )
  end

  def create 
    @player_score = PlayerScore.new(params.permit(:name, :score))
    
    if @player_score.save 
      puts "nice"
    end
  end
end
