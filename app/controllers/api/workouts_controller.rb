class Api::WorkoutsController < ApplicationController

  def index
    @workouts = current_user.workouts
  end
  
  def show
    @workout = Workout.find(params[:id])
    @route = Route.find(@workout.route_id)
  end

  def create
    @workout = Workout.new(workout_params)
    @workout.user_id = current_user.id
    if @workout.save
      render :show
    else
      render json: @workout.errors.full_messages, status: 422
    end
  end
  
  def update
    @workout = current_user.workouts.find(params[:id])
    if @workout.update(workout_params)
      render :show
    else
      render json: @workout.errors.full_messages, status: 422
    end
  end
  
  def destroy
    workout = current_user.workouts.find(params[:id])
    workout.destroy
    @workouts = [workout]
    render :index
  end

  private
  def workout_params
    params.require(:workout).permit(
      :user_id, :route_id, :title, :workout_type, :duration, :avg_speed, 
      :avg_hr, :resting_hr, :fatigue, :mood, :motivation, :quality, :comment
    )
  end
end
