class Api::WorkoutsController < ApplicationController

  def index
    if params[:user_id] == current_user.id
      @workouts = current_user.workouts
    else
      @workouts = workouts.all
    end
  end
  
  def show
    @workout = Workout.find(params[:id])
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
    @workout = current_user.workouts.find(parmas[:id])
    if @workout.update(workout_params)
      render :show
    else
      render json: @workout.errors.full_messages, status: 422
    end
  end
  
  def destroy
    workout = current_user.workouts.find(params[:id])
    workout.destroy
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
