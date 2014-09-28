class Entry < ActiveRecord::Base
  belongs_to :user

  validates :user, presence: true
  validates :meal, presence: true, length: {minimum: 2, maximum: 50}
  validates :calories, presence: true, numericality: {greater_than_or_equal_to: 0, less_than: 100000}
  validates :date, presence: true
  validates :description, length: {maximum: 10000}, allow_blank: true
end
