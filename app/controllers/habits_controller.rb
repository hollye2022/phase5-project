class HabitsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

    def index
        habits = Habit.all
        render json: habits, status: :ok
    end

    def create
        habit = Habit.create!(habit_params)
        render json: habit, status: :created
    end

    def destroy
        habit = Habit.find(params[:id])
        if habit
            habit.destroy
            head :no_content
        else
            render json: {error: "Habit not found"}, status: :not_found
        end
    end

    private

    def habit_params
        params.permit(:name)
    end

    def render_unprocessable_entity
        render json: {error: invalid.record.errors}, status: :unprocessable_entity
    end

end
