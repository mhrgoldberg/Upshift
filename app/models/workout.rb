class Workout < ApplicationRecord

  validates :user_id, :route_id, :title, :workout_type, :duration, :avg_speed, presence: true

  belongs_to :user
  belongs_to :route

end
