class User < ApplicationRecord
  has_many :employers, class_name: 'Calc::Employer'
  has_many :hour_rates, class_name: 'Calc::HourRate'
end
