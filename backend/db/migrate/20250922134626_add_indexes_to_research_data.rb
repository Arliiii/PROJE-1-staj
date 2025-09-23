class AddIndexesToResearchData < ActiveRecord::Migration[8.0]
  def change
    add_index :research_data, :title
    add_index :research_data, :author
    add_index :research_data, :category
    add_index :research_data, :publication_date
    add_index :research_data, :created_at
    
    # Composite index for common search patterns
    add_index :research_data, [:category, :publication_date]
    add_index :research_data, [:author, :category]
  end
end
