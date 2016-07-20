# This file is copied to spec/ when you run 'rails generate rspec:install'
ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
# Prevent database truncation if the environment is production
abort("The Rails environment is running in production mode!") if Rails.env.production?
require 'spec_helper'
require 'rspec/rails'
require "capybara/rails"
require "valid_attribute"

# Add additional requires below this line. Rails is not loaded until this point!
Capybara.javascript_driver = :webkit

Dir[Rails.root.join('spec/support/**/*.rb')].each { |f| require f }

# Checks for pending migration and applies them before tests are run.
# If you are not using ActiveRecord, you can remove this line.
ActiveRecord::Migration.maintain_test_schema!

RSpec.configure do |config|
  # Remove this line if you're not using ActiveRecord or ActiveRecord fixtures
  config.fixture_path = "#{::Rails.root}/spec/fixtures"

  # I'm turning this off to use database cleaner / to make Capybara happy.
  # config.use_transactional_fixtures = true

  # https://relishapp.com/rspec/rspec-rails/docs
  config.infer_spec_type_from_file_location!

  # Filter lines from Rails gems in backtraces.
  config.filter_rails_from_backtrace!
  # arbitrary gems may also be filtered via:
  # config.filter_gems_from_backtrace("gem name")

  config.include FactoryGirl::Syntax::Methods

  config.include Warden::Test::Helpers
  config.before :suite do
    Warden.test_mode!
  end

  config.after :each do
    Warden.test_reset!
  end
end

Capybara::Webkit.configure do |config|
    # config.allow_url("https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css")
    config.allow_unknown_urls
    config.timeout = 5
  end
