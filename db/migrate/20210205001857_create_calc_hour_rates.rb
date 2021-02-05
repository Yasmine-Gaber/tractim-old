class CreateCalcHourRates < ActiveRecord::Migration[6.1]
  def change
    create_table :calc_hour_rates do |t|
      t.string :name
      t.references :user, null: false, foreign_key: true
      t.references :employer, null: false, foreign_key: { to_table: :calc_employers }
      t.integer :period_length
      t.decimal :period_rate

      t.timestamps
    end
  end
end
