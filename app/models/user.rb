class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :rememberable, :validatable


  has_many :entries
  validates :daily_calories, numericality: {greater_than_or_equal_to:0, less_than:100000}

  before_save :ensure_authentication_token

  after_create :init_prefs


  def ensure_authentication_token
    self.auth_token ||= generate_authentication_token
  end

  def init_prefs
    self.daily_calories = 2000
    self.save
  end

  private

  def generate_authentication_token
    loop do
      token = Devise.friendly_token
      break token unless User.where(auth_token: token).first
    end
  end
end
