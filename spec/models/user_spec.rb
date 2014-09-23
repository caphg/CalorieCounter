require 'spec_helper'

RSpec.describe User, :type => :model do
  describe "#create" do
    it "should set daily calories and auth token" do
      user = FactoryGirl.create(:user)
      user.daily_calories.should eq 2000
      user.auth_token.should_not be_nil
    end
  end
end
