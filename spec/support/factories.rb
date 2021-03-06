FactoryGirl.define do
  factory :user do
    first_name 'Jon'
    last_name 'Smith'
    sequence(:email) { |n| "person#{n}@example.com" }
    password 'password'
    password_confirmation 'password'
  end

  factory :recipe do
    user
    sequence(:title) { |n| "Basic Mead Recipe #{n}"}
    sweetness 'Semi-Sweet'
    variety 'Mead'
  end

  factory :ingredient do
    recipe
    name (%w(honey water yeast)).sample
    unit 'cups'
    amount 3
  end

  factory :step do
    recipe
    action 'Do some things'
  end

  factory :batch do
    user
    recipe
    name 'Batch 1'
    initial_hydrometer 1.060
    final_hydrometer 1.020
  end
end
