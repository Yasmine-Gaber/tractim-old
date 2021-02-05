class Calc::Employer < ApplicationRecord
  belongs_to :user
  has_many :hour_rates
end
