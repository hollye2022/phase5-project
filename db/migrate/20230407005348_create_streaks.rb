class CreateStreaks < ActiveRecord::Migration[7.0]
  def change
    create_table :streaks do |t|
      t.integer :count
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :habit, null: false, foreign_key: true

      t.timestamps
    end
  end
end
