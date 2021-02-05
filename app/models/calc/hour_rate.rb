class Calc::HourRate < ApplicationRecord
  belongs_to :user
  belongs_to :employer, class_name: 'Calc::Employer'
  has_many :attendaces
end
