class AddGoalsToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :goal_1, :text
    add_column :users, :goal_2, :text
    add_column :users, :goal_3, :text
  end
end
