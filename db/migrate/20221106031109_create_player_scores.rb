class CreatePlayerScores < ActiveRecord::Migration[7.0]
  def change
    create_table :player_scores do |t|
      t.string :name
      t.integer :score

      t.timestamps
    end
  end
end
