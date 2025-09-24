class ResearchDatum < ApplicationRecord
  validates :title, presence: true
  validates :author, presence: true
  validates :publication_date, presence: true

  # Scopes using PostgreSQL syntax
  scope :by_category, ->(category) { where(category: category) if category.present? }
  scope :by_year, ->(year) { where('EXTRACT(year FROM publication_date) = ?', year) if year.present? }
  scope :published_in_month, ->(year, month) { 
    where('EXTRACT(year FROM publication_date) = ? AND EXTRACT(month FROM publication_date) = ?', year, month) 
  }
  scope :recent, -> { where('created_at >= ?', 30.days.ago) }
  scope :open_access, -> { where(open_access: true) }
  scope :with_high_impact, ->(min_factor) { where('impact_factor >= ?', min_factor) if min_factor }

  # Search scope using PostgreSQL ILIKE for case-insensitive search
  scope :search_text, ->(query) {
    where(
      "title ILIKE ? OR abstract ILIKE ? OR author ILIKE ? OR keywords ILIKE ?",
      "%#{query}%", "%#{query}%", "%#{query}%", "%#{query}%"
    ) if query.present?
  }

  def self.monthly_publication_stats
    group("DATE_TRUNC('month', publication_date)")
      .order("DATE_TRUNC('month', publication_date)")
      .count
  end

  def self.yearly_stats
    group("EXTRACT(year FROM publication_date)")
      .order("EXTRACT(year FROM publication_date)")
      .count
  end
end
