json.users do 
  @users.each do |user|
    json.set! user.id do  
      json.partial! 'api/users/user', user: user
    end
  end
end

json.userWorkouts do
  @users_workouts.each do |workout|
    json.set! workout.id do
      json.partial! 'api/workouts/workout', workout: workout
    end
  end
end

json.workouts do
  @workouts.each do |workout|
    json.set! workout.id do
      json.partial! 'api/workouts/workout', workout: workout
    end
  end
end

json.routes do
  @routes.each do |route|
    json.set! route.id do
      json.partial! 'api/routes/route', route: route
    end
  end
end
