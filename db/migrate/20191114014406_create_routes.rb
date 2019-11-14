class CreateRoutes < ActiveRecord::Migration[5.2]
  def change
    create_table :routes do |t|
      t.integer :user_id, null: false, index: true
      t.float :distance, null: false, index: true
      t.string :title, null:false
      t.string :route_type, null: false, index: true
      t.integer :elevation_gain, null: false
      t.integer :elevation_loss, null: false
      t.integer :max_elevation, null: false
      t.text :data, null: false
      t.timestamps
    end
  end
end
