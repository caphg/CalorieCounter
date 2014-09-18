class UsersController < ApplicationController
  before_action :authenticate_user!

  def profile
    @user = current_user
  end

  def update_preferences

    respond_to do |format|
      if current_user.update(user_params)
        format.html { redirect_to @user, notice: 'Preferences updated.' }
        format.json { render :profile, status: :ok, location: @user }
      else
        format.html { render :profile }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end


  private
  # Never trust parameters from the scary internet, only allow the white list through.
  def user_params
    params.require(:user).permit()
  end


end
