class Api::V1::BaseController < ApplicationController
  # Set content type to JSON
  before_action :set_default_response_format
  
  # Handle common exceptions
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ActionController::ParameterMissing, with: :parameter_missing
  
  private
  
  def set_default_response_format
    request.format = :json
  end

  def record_not_found(exception)
    render json: {
      error: "Record not found",
      message: exception.message,
      status: 404
    }, status: :not_found
  end

  def parameter_missing(exception)
    render json: {
      error: "Missing parameter",
      message: exception.message,
      status: 400
    }, status: :bad_request
  end

  def render_validation_errors(model)
    render json: {
      error: "Validation failed",
      message: "The request could not be completed due to validation errors",
      errors: model.errors.full_messages,
      details: model.errors.messages,
      status: 422
    }, status: :unprocessable_entity
  end
end