class UsersController < ApplicationController
  before_action :auth!

  def profile
    @user = current_user
  end

  def update

    respond_to do |format|
      if current_user.update(user_params)
        format.html { redirect_to current_user, notice: 'Preferences updated.' }
        format.json { head :ok }
      else
        format.html { render :profile }
        format.json { head :unprocessable_entity }
      end
    end
  end


  private
  # Never trust parameters from the scary internet, only allow the white list through.
  def user_params
    params.require(:user).permit(:daily_calories)
  end

  def auth!
    if params.has_key?(:auth_token)
      use_token(params[:auth_token])
    else
      authenticate_user!
    end
  end

  def use_token(token)
    current_user = User.find_by_auth_token(token)
    if current_user.nil?
      head :unauthorized
    else
      sign_in(current_user)
    end
  end

end
