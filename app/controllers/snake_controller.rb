class SnakeController < ApplicationController
  def index
    @highscores =  PlayerScore.all.order( 'score DESC' ).last(10)
  end
end
