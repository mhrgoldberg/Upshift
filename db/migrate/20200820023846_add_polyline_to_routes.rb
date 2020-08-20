class AddPolylineToRoutes < ActiveRecord::Migration[5.2]
  def change
    add_column :routes, :polyline, :text, null: false
    add_column :routes, :elevation_samples, :text, null: false
    add_column :routes, :path, :text, null: false
    remove_column :routes, :data, :text
    add_column :routes, :waypoints, :text
  end
end
