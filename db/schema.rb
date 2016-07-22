# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160722022056) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "batches", force: :cascade do |t|
    t.integer  "user_id",                            null: false
    t.integer  "recipe_id",                          null: false
    t.string   "name",                               null: false
    t.text     "description"
    t.date     "start_date"
    t.date     "end_date"
    t.float    "initial_hydrometer"
    t.float    "final_hydrometer"
    t.float    "approx_abv"
    t.text     "notes"
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
    t.boolean  "variation",          default: false
  end

  create_table "ingredients", force: :cascade do |t|
    t.string  "name",      null: false
    t.integer "recipe_id"
    t.float   "amount",    null: false
    t.string  "unit",      null: false
    t.integer "batch_id"
  end

  create_table "recipes", force: :cascade do |t|
    t.integer  "user_id",                   null: false
    t.string   "title",                     null: false
    t.string   "sweetness",                 null: false
    t.string   "variety",                   null: false
    t.integer  "success_count", default: 0
    t.integer  "failure_count", default: 0
    t.text     "notes"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  create_table "steps", force: :cascade do |t|
    t.integer  "recipe_id"
    t.string   "action",                     null: false
    t.integer  "step_num",                   null: false
    t.boolean  "completed?", default: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.integer  "batch_id"
  end

  create_table "users", force: :cascade do |t|
    t.string   "first_name",                          null: false
    t.string   "last_name",                           null: false
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
