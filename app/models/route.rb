class Route < ApplicationRecord
  validates :distance, :title, :route_type, :elevation_gain,
    :elevation_loss, :max_elevation, :polyline, :elevation_samples,
    :path, presence: true

  belongs_to :user
end
