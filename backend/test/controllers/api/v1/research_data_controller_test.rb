require "test_helper"

class Api::V1::ResearchDataControllerTest < ActionDispatch::IntegrationTest
  setup do
    @research_datum = research_data(:one)
  end

  test "should get index" do
    get api_v1_research_data_url, as: :json
    assert_response :success
    
    json_response = JSON.parse(response.body)
    assert json_response.key?('data')
    assert json_response.key?('total_count')
  end

  test "should create research_datum with valid data" do
    assert_difference('ResearchDatum.count') do
      post api_v1_research_data_url, params: {
        title: "New Research Study",
        author: "Jane Smith",
        category: "Science",
        keywords: "new, research",
        publication_date: Date.current,
        abstract: "This is a new research abstract",
        methodology: "New methodology",
        results: "New results",
        conclusions: "New conclusions"
      }, as: :json
    end

    assert_response :created
    json_response = JSON.parse(response.body)
    assert_equal "New Research Study", json_response['title']
    assert_equal "Jane Smith", json_response['author']
  end

  test "should not create research_datum with invalid data" do
    assert_no_difference('ResearchDatum.count') do
      post api_v1_research_data_url, params: {
        title: "", # Invalid: too short
        author: "",
        category: ""
      }, as: :json
    end

    assert_response :unprocessable_entity
    json_response = JSON.parse(response.body)
    assert json_response.key?('errors')
  end

  test "should show research_datum" do
    get api_v1_research_datum_url(@research_datum), as: :json
    assert_response :success
    
    json_response = JSON.parse(response.body)
    assert_equal @research_datum.id, json_response['id']
  end

  test "should update research_datum with valid data" do
    patch api_v1_research_datum_url(@research_datum), params: {
      title: "Updated Research Title"
    }, as: :json
    assert_response :success
    
    json_response = JSON.parse(response.body)
    assert_equal "Updated Research Title", json_response['title']
  end

  test "should not update research_datum with invalid data" do
    patch api_v1_research_datum_url(@research_datum), params: {
      title: "Hi" # Too short
    }, as: :json
    assert_response :unprocessable_entity
    
    json_response = JSON.parse(response.body)
    assert json_response.key?('errors')
  end

  test "should destroy research_datum" do
    assert_difference('ResearchDatum.count', -1) do
      delete api_v1_research_datum_url(@research_datum), as: :json
    end

    assert_response :no_content
  end

  test "should get analytics" do
    get analytics_api_v1_research_data_url, as: :json
    assert_response :success
    
    json_response = JSON.parse(response.body)
    assert json_response.key?('total_count')
    assert json_response.key?('by_category')
    assert json_response.key?('by_month')
    assert json_response.key?('recent_additions')
  end

  test "should get categories" do
    get categories_api_v1_research_data_url, as: :json
    assert_response :success
    
    json_response = JSON.parse(response.body)
    assert json_response.key?('categories')
  end

  test "should return 404 for non-existent record" do
    get api_v1_research_datum_url(99999), as: :json
    assert_response :not_found
    
    json_response = JSON.parse(response.body)
    assert_equal "Record not found", json_response['error']
  end
end