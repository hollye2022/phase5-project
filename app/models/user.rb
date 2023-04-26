class User < ApplicationRecord
    has_many :streaks, dependent: :destroy
    has_many :habits, through: :streaks
    has_secure_password
    has_many :notes, dependent: :destroy

    validates :username, presence: true, uniqueness: true
    validates :password, length: {in: 6..20}
    validates :email, uniqueness: true
end
