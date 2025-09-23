class CreateResearchData < ActiveRecord::Migration[8.0]
  def change
    create_table :research_data do |t|
      t.string :name
      t.string :category
      t.integer :value
      t.text :description

      t.timestamps
    end
  end
end
