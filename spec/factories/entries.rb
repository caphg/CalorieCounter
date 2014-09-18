# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :entry do
    meal "MyString"
    calories "9.99"
    date "2014-09-18 10:12:35"
    description "MyString"
  end
end
