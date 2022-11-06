require "test_helper"

class SnakeControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get snake_index_url
    assert_response :success
  end
end
