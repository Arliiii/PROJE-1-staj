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

ActiveRecord::Schema[8.0].define(version: 2025_09_23_100631) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "research_data", force: :cascade do |t|
    t.string "category"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "title"
    t.string "author"
    t.string "keywords"
    t.date "publication_date"
    t.text "abstract"
    t.text "methodology"
    t.text "results"
    t.text "conclusions"
    t.string "journal"
    t.string "volume"
    t.string "issue"
    t.string "pages"
    t.string "doi"
    t.string "url"
    t.text "notes"
    t.index ["author", "category"], name: "index_research_data_on_author_and_category"
    t.index ["author"], name: "index_research_data_on_author"
    t.index ["category", "publication_date"], name: "index_research_data_on_category_and_publication_date"
    t.index ["category"], name: "index_research_data_on_category"
    t.index ["created_at"], name: "index_research_data_on_created_at"
    t.index ["publication_date"], name: "index_research_data_on_publication_date"
    t.index ["title"], name: "index_research_data_on_title"
  end
end
