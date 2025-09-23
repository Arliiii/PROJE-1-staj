class AddJournalFieldsToResearchData < ActiveRecord::Migration[8.0]
  def change
    add_column :research_data, :journal, :string
    add_column :research_data, :volume, :string
    add_column :research_data, :issue, :string
    add_column :research_data, :pages, :string
    add_column :research_data, :doi, :string
    add_column :research_data, :url, :string
    add_column :research_data, :notes, :text
  end
end
