class NotesController < ApplicationController

    def index
        render json: Note.all, status: :ok
    end
    
end
