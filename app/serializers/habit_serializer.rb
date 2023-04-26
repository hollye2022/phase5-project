class HabitSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :users
end 
