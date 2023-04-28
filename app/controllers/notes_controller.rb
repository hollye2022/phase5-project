class NotesController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

    def index
        if params[:user_id]
            user =User.find(params[:user_id])
            notes=user.notes
        else
            notes=Note.all
        end
        render json: notes, status: :ok
    end
    
    def create
        note = Note.create!(notes_params)
        render json: note, include: :user, status: :created
    end

    private

    def notes_params
        params.permit(:content,:user_id)
    end

    def render_unprocessable_entity(invalid)
        render json: {error: invalid.record.errors.full_messages}, status: :unprocessable_entity

    end

end

