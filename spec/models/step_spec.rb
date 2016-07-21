require 'rails_helper'

RSpec.describe Step, type: :model do
  it { should have_valid(:action).when('Pour the stuff', 'Mix the stuff') }
  it { should_not have_valid(:action).when('', nil) }

  it { should belong_to :recipe }
  it { should belong_to :batch }

  it { should have_valid(:step_num).when(1, 2, 5) }
  it { should_not have_valid(:step_num).when(nil, 0, -1, -0.5) }

end
