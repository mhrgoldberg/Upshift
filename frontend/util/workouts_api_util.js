export const postWorkout = (workout) =>
  $.ajax({
    method: "POST",
    url: "/api/workouts",
    data: { workout },
  });

export const getAllWorkouts = () =>
  $.ajax({
    method: "GET",
    url: "/api/workouts",
  });

export const getWorkout = (workoutId) =>
  $.ajax({
    method: "GET",
    url: `/api/workouts/${workoutId}`,
  });

export const patchWorkout = (workout) =>
  $.ajax({
    method: "PATCH",
    url: `/api/workouts/${workout.id}`,
    data: { workout },
  });

export const destroyWorkout = (workoutId) =>
  $.ajax({
    method: "DELETE",
    url: `/api/workouts/${workoutId}`,
  });
