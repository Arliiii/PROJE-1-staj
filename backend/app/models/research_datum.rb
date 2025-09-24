class ResearchDatum < ApplicationRecord
  validates :title, presence: true, length: { minimum: 5, maximum: 255 }
  validates :author, presence: true, length: { minimum: 2, maximum: 100 }
  validates :category, presence: true, length: { maximum: 50 }
  validates :keywords, length: { maximum: 500 }
  validates :abstract, length: { maximum: 2000 }
  validates :methodology, length: { maximum: 3000 }
  validates :results, length: { maximum: 3000 }
  validates :conclusions, length: { maximum: 2000 }
  validates :publication_date, presence: true

  # Scopes for common queries (PostgreSQL compatible)
  scope :by_category, ->(category) { where(category: category) }
  scope :by_author, ->(author) { where("author ILIKE ?", "%#{author}%") }
  scope :recent, -> { order(created_at: :desc) }
  scope :published_after, ->(date) { where("publication_date >= ?", date) }
end
