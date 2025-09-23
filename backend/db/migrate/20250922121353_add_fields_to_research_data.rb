class AddFieldsToResearchData < ActiveRecord::Migration[8.0]
  def change
    add_column :research_data, :title, :string
    add_column :research_data, :author, :string
    add_column :research_data, :keywords, :string
    add_column :research_data, :publication_date, :date
    add_column :research_data, :abstract, :text
    add_column :research_data, :methodology, :text
    add_column :research_data, :results, :text
    add_column :research_data, :conclusions, :text
  end
end
