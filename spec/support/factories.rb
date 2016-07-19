FactoryGirl.define do
  factory :user do
    first_name 'Jon'
    last_name 'Smith'
    sequence(:email) {|n| "person#{n}@example.com"}
    password 'password'
    password_confirmation 'password'
  end

  factory :recipe do
    user
    title 'Basic Mead'
    sweetness 'Semi-Sweet'
    variety 'Basic'
  end

  # factory :recipe do
  #   user
  #   title 'Basic Mead'
  #   sweetness 'Semi-Sweet'
  #   variety 'Basic'
  # end
  #
  factory :ingredient do
    recipe
    name (%w(honey water yeast)).sample
    unit 'cups'
    amount 3
  end
  #
  # factory :recipe_ingredient do
  #   recipe
  #   ingredient
  # end
end
