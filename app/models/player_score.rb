class PlayerScore < ApplicationRecord
    validates :score, presence: true
    
    validates :name, presence: true, length: {minimum:1, maximum:3}
end
