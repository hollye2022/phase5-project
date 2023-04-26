class UsersController < ApplicationController

rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

 skip_before_action :authorized_user, only: [:create]
   wrap_parameters format: []

   def index
    render json: User.all, status: :ok
   end


    def show
        user = User.find(params[:id])
        render json: user, include: ["notes","streaks","streaks.habit"], status: :ok
    end

    def me
        user = User.find_by(id: session[:user_id])
        if user
            render json: user
        else
            render json: {error: "Not Authorized"}, status: :unauthorized
        end
    end

    def create
        user = User.create!(user_params)
        render json: :user, status: :created
    end

    private

    def render_unprocessable_entity(invalid)
        render json: {error: invalid.record.errors}, status: :unprocessable_entity

    end


    def user_params
        params.permit(:username, :email, :password)
    end

end
