class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update]

  def index
    users = User.all.order(created_at: :desc)
    render json: users
  end

  def create
    user = User.create(user_params)
    if user
      render json: user
    else
      render json: user.errors
    end
  end

  def show
    if @user
      render json: @user
    else
      render json: @user.errors
    end
  end

  def edit
    render json: @user
  end

  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors
    end
  end

  private
  def user_params
    params.permit(:name, :email)
  end

  def set_user
    @user ||= User.find(params[:id])
  end
end
