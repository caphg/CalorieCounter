class UsersController < ApplicationController
  before_action :authenticate_user!

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


end
