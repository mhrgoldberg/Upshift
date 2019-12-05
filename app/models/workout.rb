class Workout < ApplicationRecord

  validates :user_id, :route_id, :title, :workout_type, :duration, :avg_speed, presence: true
  validates :duration, :avg_speed, numericality: true


  belongs_to :user
  belongs_to :route

end
