class CreateCalcEmployers < ActiveRecord::Migration[6.1]
  def change
    create_table :calc_employers do |t|
      t.string :name
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
