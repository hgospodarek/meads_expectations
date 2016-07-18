FactoryGirl.define do
  factory :user do
    first_name 'Jon'
    last_name 'Smith'
    sequence(:email) {|n| "person#{n}@example.com"}
    password 'password'
    password_confirmation 'password'
  end


end
