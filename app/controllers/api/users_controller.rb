class Api::UsersController < ApplicationController
  
  def index
    @users = User.all
    @users_workouts = current_user.workouts
    @workouts = Workout.all
    @routes = Route.all
  end

  def show
    @user = User.find(params[:id])
    @workouts = User.workouts
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end
  
  private
  def user_params
    params.require(:user).permit(
      :username, :password, :city, :state, :country, 
      :gender, :age, :primary_sport
    )
  end
end
