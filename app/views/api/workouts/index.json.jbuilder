json.workouts do 
  json.array! @workouts do |workout|
      json.partial! 'api/routes/workout', workout: workout
  end
end
