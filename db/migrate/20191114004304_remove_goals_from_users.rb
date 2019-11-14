class RemoveGoalsFromUsers < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :goal_1, :text
    remove_column :users, :goal_2, :text
    remove_column :users, :goal_3, :text
  end
end
