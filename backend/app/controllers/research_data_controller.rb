class ResearchDataController < ApplicationController
  before_action :set_research_datum, only: [:show, :update, :destroy]

  # GET /research_data
  def index
    @research_data = ResearchDatum.all
    render json: @research_data
  end

  # GET /research_data/1
  def show
    render json: @research_datum
  end

  # POST /research_data
  def create
    @research_datum = ResearchDatum.new(research_datum_params)

    if @research_datum.save
      render json: @research_datum, status: :created
    else
      render json: @research_datum.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /research_data/1
  def update
    if @research_datum.update(research_datum_params)
      render json: @research_datum
    else
      render json: @research_datum.errors, status: :unprocessable_entity
    end
  end

  # DELETE /research_data/1
  def destroy
    @research_datum.destroy
    head :no_content
  end

  # GET /research_data/analytics
  def analytics
    total_entries = ResearchDatum.count
    
    by_category = ResearchDatum.group(:category).count
    
    by_month = ResearchDatum.group("strftime('%Y-%m', publication_date)").count
    
    recent_entries = ResearchDatum.where('created_at >= ?', 30.days.ago).count

    render json: {
      total_entries: total_entries,
      by_category: by_category,
      by_month: by_month,
      recent_entries: recent_entries
    }
  end

  private

  def set_research_datum
    @research_datum = ResearchDatum.find(params[:id])
  end

  def research_datum_params
    params.require(:research_datum).permit(:title, :author, :category, :keywords, :publication_date, :abstract, :methodology, :results, :conclusions)
  end
end