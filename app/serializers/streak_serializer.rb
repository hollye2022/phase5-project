class StreakSerializer < ActiveModel::Serializer
  attributes :id, :count
  belongs_to :habit
end
