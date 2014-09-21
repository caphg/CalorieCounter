FactoryGirl.define do

  factory :language do
    language "English"
  end

  factory :user do
    sequence(:email) {|n| "user#{n}@email.com" }
    password '12345678'
    password_confirmation '12345678'
    daily_calories 2000
  end

  factory :entry do
    meal "lunch"
    calories 1800
    date "2014-09-21"
    description "good stuff"
    user
  end

end