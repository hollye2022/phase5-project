class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email
  has_many :streaks
  has_many :habits
  has_many :notes
end
