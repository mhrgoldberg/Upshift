json.workouts do 
  @workouts.each do |workout|
      json.set! workout.id do
        json.partial! 'api/workouts/workout', workout: workout
      end
  end
end
