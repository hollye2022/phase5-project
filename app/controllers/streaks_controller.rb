class StreaksController < ApplicationController

    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

    
    def index
        render json: Streak.all, status: :ok
    end


    def create
        
        streak=Streak.create!(streak_params)

        render json: streak, status: :created
    end

    def show
        streak = Streak.find(params[:id])
        render json: streak, status: :ok
    end

    def destroy
        streak = Streak.find(params[:id])
        if streak
            streak.destroy
            head :no_content
        else
            render json: {error: "Streak not found"}, status: :not_found
        end
    end

    def increment_count
        streak = Streak.find(params[:id])
        streak.increment!(:count)
        render json: { message: "Streak count incremented" }
    end

    private
    
    def streak_params
        
        params.permit(:user_id, :habit_id,:count)
    end

    def render_unprocessable_entity(invalid)
        render json: {error: invalid.record.errors.full_messages}, status: :unprocessable_entity

    end

end
