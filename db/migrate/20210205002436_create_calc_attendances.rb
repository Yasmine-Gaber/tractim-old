class CreateCalcAttendances < ActiveRecord::Migration[6.1]
  def change
    create_table :calc_attendances do |t|
      t.references :hour_rate, null: false, foreign_key: { to_table: :calc_hour_rates }
      t.datetime :start_at
      t.datetime :end_at
      t.integer :break_duration
      t.integer :total_duration
      t.string :comment

      t.timestamps
    end
  end
end
