class ApplicationController < ActionController::API
    def test
        render json: {message: "success!"}, status: :ok
    end
end

