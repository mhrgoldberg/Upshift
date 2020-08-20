# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_08_20_023846) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "routes", force: :cascade do |t|
    t.integer "user_id", null: false
    t.float "distance", null: false
    t.string "title", null: false
    t.string "route_type", null: false
    t.integer "elevation_gain", null: false
    t.integer "elevation_loss", null: false
    t.integer "max_elevation", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "polyline", null: false
    t.text "elevation_samples", null: false
    t.text "path", null: false
    t.text "waypoints"
    t.index ["distance"], name: "index_routes_on_distance"
    t.index ["route_type"], name: "index_routes_on_route_type"
    t.index ["user_id"], name: "index_routes_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.string "city"
    t.string "state"
    t.string "country"
    t.string "gender"
    t.integer "age"
    t.string "primary_sport"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  create_table "workouts", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "route_id", null: false
    t.string "title", null: false
    t.string "workout_type", null: false
    t.float "duration", null: false
    t.float "avg_speed", null: false
    t.integer "avg_hr"
    t.integer "resting_hr"
    t.integer "fatigue"
    t.integer "mood"
    t.integer "motivation"
    t.integer "quality"
    t.text "comment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["route_id"], name: "index_workouts_on_route_id"
    t.index ["title"], name: "index_workouts_on_title"
    t.index ["user_id"], name: "index_workouts_on_user_id"
    t.index ["workout_type"], name: "index_workouts_on_workout_type"
  end

end
