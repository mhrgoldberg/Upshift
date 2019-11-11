class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.string :city
      t.string :state
      t.string :country      
      t.string :gender
      t.integer :age
      t.string :primary_sport

      t.timestamps
    end
    add_index :users, :username, unique: true
    add_index :users, :session_token, unique: true
  end
end
