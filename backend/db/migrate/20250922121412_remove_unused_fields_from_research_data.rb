class RemoveUnusedFieldsFromResearchData < ActiveRecord::Migration[8.0]
  def change
    remove_column :research_data, :name, :string
    remove_column :research_data, :value, :integer
    remove_column :research_data, :description, :text
  end
end
