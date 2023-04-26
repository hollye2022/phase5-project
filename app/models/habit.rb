class Habit < ApplicationRecord
    has_many :streaks, dependent: :destroy
    has_many :users, through: :streaks

    validates :name, presence: true, uniqueness: true
end
