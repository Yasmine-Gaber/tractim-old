# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_02_05_002436) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "calc_attendances", force: :cascade do |t|
    t.bigint "hour_rate_id", null: false
    t.datetime "start_at"
    t.datetime "end_at"
    t.integer "break_duration"
    t.integer "total_duration"
    t.string "comment"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["hour_rate_id"], name: "index_calc_attendances_on_hour_rate_id"
  end

  create_table "calc_employers", force: :cascade do |t|
    t.string "name"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_calc_employers_on_user_id"
  end

  create_table "calc_hour_rates", force: :cascade do |t|
    t.string "name"
    t.bigint "user_id", null: false
    t.bigint "employer_id", null: false
    t.integer "period_length"
    t.decimal "period_rate"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["employer_id"], name: "index_calc_hour_rates_on_employer_id"
    t.index ["user_id"], name: "index_calc_hour_rates_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "calc_attendances", "calc_hour_rates", column: "hour_rate_id"
  add_foreign_key "calc_employers", "users"
  add_foreign_key "calc_hour_rates", "calc_employers", column: "employer_id"
  add_foreign_key "calc_hour_rates", "users"
end
