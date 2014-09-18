class Entry < ActiveRecord::Base
  belongs_to :user

  validates :meal, presence: true, length: {minimum: 2, maximum: 50}
  validates :calories, presence: true, numericality: {greater_than: 1, less_than: 100000}
  validates :date, presence: true
  validates :description, length: {minimum: 1, maximum: 10000}
end
