class Api::RoutesController < ApplicationController

  def index
    @routes = current_user.routes
  end

  def show
    @route = Route.find(params[:id])
  end

  def create
    @route = Route.new(route_params)
    @route.user_id = current_user.id
    if @route.save
      render :show
    else
      render json: @route.errors.full_messages, status: 422
    end
  end

  def route_params
    params.require(:route).permit(
      :distance, :title, :route_type, :elevation_gain, 
      :elevation_loss, :max_elevation, :path, :waypoints,
      :elevation_samples, :polyline
    )
  end

end
