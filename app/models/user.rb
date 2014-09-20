class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :rememberable, :validatable

  has_many :entries

  after_create :init_prefs

  def init_prefs
    self.daily_calories = 2000
    self.save
  end

  validates :daily_calories, numericality: {min:0, max:100000}
end
