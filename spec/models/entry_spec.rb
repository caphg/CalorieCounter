require 'spec_helper'

RSpec.describe Entry, :type => :model do
  it { should validate_presence_of(:meal) }
  it { should validate_presence_of(:calories) }
  it { should validate_presence_of(:date) }
  it { should belong_to(:user) }


  describe "#meal" do
    it "should be between 2 and 50 chars long" do
      should ensure_length_of(:meal).is_at_least(2).is_at_most(50)
    end
  end

  describe "#calories" do
    it "should be between 0 and 100000" do
      should validate_numericality_of(:calories).is_greater_than_or_equal_to(0).is_less_than(100000)
    end

    it "allows decimal values" do
      should allow_value(100.5).for(:calories)
    end

    it "should not allow negative values" do
      should_not allow_value(-5).for(:calories)
    end
  end

  describe "#date" do
    it "should not allow invalid date" do
      should_not allow_value('invalid date').for(:date)
    end
  end

  describe "#description" do
    it "should be between 1 and 10000 chars long" do
      should ensure_length_of(:description).is_at_least(1).is_at_most(10000)
    end
  end

  describe "creation" do
    it "can be created" do
      entry = FactoryGirl.create(:entry)
      entry.should be_valid
    end
  end

end