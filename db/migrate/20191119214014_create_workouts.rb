class CreateWorkouts < ActiveRecord::Migration[5.2]
  def change
    create_table :workouts do |t|
      t.integer :user_id, null: false, index: true
      t.integer :route_id, null: false, index: true
      t.string :title, null: false, index: true
      t.string :workout_type, null: false, index: true
      t.float :duration, null: false
      t.float :avg_speed, null: false
      t.integer :avg_hr
      t.integer :resting_hr
      t.integer :fatigue
      t.integer :mood
      t.integer :motivation
      t.integer :quality
      t.text :comment
      t.timestamps
    end
  end
end
