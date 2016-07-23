class RemoveStepNumFromSteps < ActiveRecord::Migration
  def change
    remove_column :steps, :step_num
  end
end
