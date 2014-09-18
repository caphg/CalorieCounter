class AddDailyCaloriesToUser < ActiveRecord::Migration
  def change
    add_column :users, :daily_calories, :decimal
  end
end
