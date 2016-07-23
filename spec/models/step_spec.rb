require 'rails_helper'

RSpec.describe Step, type: :model do
  it { should have_valid(:action).when('Pour the stuff', 'Mix the stuff') }
  it { should_not have_valid(:action).when('', nil) }

  it { should belong_to :recipe }
  it { should belong_to :batch }

end
