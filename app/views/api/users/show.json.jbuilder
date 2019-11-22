json.partial! 'api/users/user', user: @user

json.workouts do 
  json.array! @workouts do |workout|
      json.partial! 'api/workouts/workout', workout: workout
  end
end
