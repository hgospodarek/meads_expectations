class User < ActiveRecord::Base
  validates :first_name, presence: true
  validates :last_name, presence: true

  has_many :recipes
  has_many :batches

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
