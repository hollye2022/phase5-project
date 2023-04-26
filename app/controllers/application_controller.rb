class ApplicationController < ActionController::API
    include ActionController::Cookies
    
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

    before_action :authorized_user

    def current_user
        User.find_by(id: session[:user_id])
    end

    def authorized_user
        render json: {error: "Not Authorized"}, status: :unauthorized unless
        current_user
    end

    private

    def render_unprocessable_entity(invalid)
        render json: {errors: invalid.record.errors}, status: :render_unprocessable_entity
    end

    def render_not_found(error)
        render json: {errors: {error.model => "Not Found"}}, status: :not_found
    end
    # def test
    #     render json: {message: "success!"}, status: :ok
    # end

end

