require "test_helper"

class ResearchDatumTest < ActiveSupport::TestCase
  def setup
    @research_datum = ResearchDatum.new(
      title: "Sample Research Title",
      author: "John Doe",
      category: "Technology",
      keywords: "test, research",
      publication_date: Date.current,
      abstract: "This is a sample abstract",
      methodology: "Sample methodology",
      results: "Sample results",
      conclusions: "Sample conclusions"
    )
  end

  test "should be valid with valid attributes" do
    assert @research_datum.valid?
  end

  test "should require title" do
    @research_datum.title = nil
    assert_not @research_datum.valid?
    assert_includes @research_datum.errors[:title], "can't be blank"
  end

  test "should require author" do
    @research_datum.author = nil
    assert_not @research_datum.valid?
    assert_includes @research_datum.errors[:author], "can't be blank"
  end

  test "should require category" do
    @research_datum.category = nil
    assert_not @research_datum.valid?
    assert_includes @research_datum.errors[:category], "can't be blank"
  end

  test "should require publication_date" do
    @research_datum.publication_date = nil
    assert_not @research_datum.valid?
    assert_includes @research_datum.errors[:publication_date], "can't be blank"
  end

  test "title should be at least 5 characters" do
    @research_datum.title = "Hi"
    assert_not @research_datum.valid?
    assert_includes @research_datum.errors[:title], "is too short (minimum is 5 characters)"
  end

  test "author should be at least 2 characters" do
    @research_datum.author = "A"
    assert_not @research_datum.valid?
    assert_includes @research_datum.errors[:author], "is too short (minimum is 2 characters)"
  end

  test "should find by category scope" do
    @research_datum.save!
    results = ResearchDatum.by_category("Technology")
    assert_includes results, @research_datum
  end

  test "should find by author scope" do
    @research_datum.save!
    results = ResearchDatum.by_author("John")
    assert_includes results, @research_datum
  end
end
