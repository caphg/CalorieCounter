class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  skip_before_action :verify_authenticity_token, if: :json_request?

  before_filter :update_sanitized_params, if: :devise_controller?


  protected

    def json_request?
      request.format.json?
    end

    #  method to sanitized params for devise user sign up
    def update_sanitized_params
      devise_parameter_sanitizer.for(:sign_up) {|u| u.permit(:email,:password, :password_confirmation, :daily_calories)}
    end

end
