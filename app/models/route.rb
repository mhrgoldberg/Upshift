class Route < ApplicationRecord
  validates :distance, :title, :route_type, :elevation_gain,
  :elevation_loss, :max_elevation, presence: true

  belongs_to :user
end
