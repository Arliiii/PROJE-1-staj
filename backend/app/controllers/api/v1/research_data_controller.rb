require 'csv'

class Api::V1::ResearchDataController < ApplicationController
  before_action :set_research_datum, only: %i[ show edit update destroy ]

  # GET /research_data or /research_data.json
  def index
    @q = ResearchDatum.ransack(params[:q])
    
    # Get filter parameters
    category = params[:category]
    publication_year = params[:publication_year]
    search_query = params[:search]
    per_page = params[:per_page] || 10
    page = params[:page] || 1

    # Start with base scope
    @research_data = @q.result(distinct: true)

    # Apply filters
    @research_data = @research_data.where(category: category) if category.present?
    @research_data = @research_data.where('EXTRACT(year FROM publication_date) = ?', publication_year) if publication_year.present?
    
    if search_query.present?
      @research_data = @research_data.where(
        "title ILIKE ? OR abstract ILIKE ? OR author ILIKE ? OR keywords ILIKE ?",
        "%#{search_query}%", "%#{search_query}%", "%#{search_query}%", "%#{search_query}%"
      )
    end

    # Get total count before pagination
    @total_count = @research_data.count

    # Apply pagination
    @research_data = @research_data.offset((page.to_i - 1) * per_page.to_i).limit(per_page.to_i)

    # Transform data for response
    transformed_data = @research_data.map do |datum|
      {
        id: datum.id,
        title: datum.title,
        author: datum.author,
        publication_date: datum.publication_date,
        journal: datum.journal,
        category: datum.category,
        keywords: datum.keywords,
        abstract: datum.abstract,
        doi: datum.doi,
        url: datum.url,
        volume: datum.volume,
        issue: datum.issue,
        pages: datum.pages,
        methodology: datum.methodology,
        results: datum.results,
        conclusions: datum.conclusions,
        notes: datum.notes,
        created_at: datum.created_at,
        updated_at: datum.updated_at
      }
    end

    render json: {
      data: transformed_data,
      total_count: @total_count,
      per_page: per_page.to_i,
      current_page: page.to_i,
      total_pages: (@total_count.to_f / per_page.to_i).ceil
    }
  end

  # GET /research_data/1 or /research_data/1.json
  def show
    render json: @research_datum
  end

  # GET /research_data/new
  def new
    @research_datum = ResearchDatum.new
  end

  # GET /research_data/1/edit
  def edit
  end

  # POST /research_data or /research_data.json
  def create
    @research_datum = ResearchDatum.new(research_datum_params)

    if @research_datum.save
      render json: @research_datum, status: :created
    else
      render json: { errors: @research_datum.errors }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /research_data/1 or /research_data/1.json
  def update
    if @research_datum.update(research_datum_params)
      render json: @research_datum
    else
      render json: { errors: @research_datum.errors }, status: :unprocessable_entity
    end
  end

  # DELETE /research_data/1 or /research_data/1.json
  def destroy
    @research_datum.destroy!
    render json: { message: 'Research data deleted successfully' }
  end

  def import_csv
    if params[:file].present?
      begin
        file = params[:file]
        
        # Read and parse CSV
        csv_data = CSV.parse(file.read, headers: true)
        imported_count = 0
        
        csv_data.each do |row|
          research_datum = ResearchDatum.new(
            title: row['title'],
            authors: row['authors'],
            publication_date: (Date.parse(row['publication_date']) rescue nil),
            journal_name: row['journal_name'],
            category: row['category'],
            keywords: row['keywords'],
            abstract: row['abstract'],
            doi: row['doi'],
            url: row['url'],
            citation_count: row['citation_count']&.to_i,
            impact_factor: row['impact_factor']&.to_f,
            open_access: row['open_access'] == 'true',
            funding_source: row['funding_source'],
            methodology: row['methodology'],
            sample_size: row['sample_size']&.to_i,
            statistical_significance: row['statistical_significance']&.to_f
          )
          
          if research_datum.save
            imported_count += 1
          end
        end
        
        render json: { 
          message: "Successfully imported #{imported_count} records",
          imported_count: imported_count 
        }
      rescue => e
        render json: { error: "Import failed: #{e.message}" }, status: :unprocessable_entity
      end
    else
      render json: { error: "No file provided" }, status: :bad_request
    end
  end

  def export_csv
    @research_data = ResearchDatum.all
    
    csv_data = CSV.generate(headers: true) do |csv|
      csv << [
        'title', 'authors', 'publication_date', 'journal_name', 'category',
        'keywords', 'abstract', 'doi', 'url', 'citation_count',
        'impact_factor', 'open_access', 'funding_source', 'methodology',
        'sample_size', 'statistical_significance'
      ]
      
      @research_data.each do |datum|
        csv << [
          datum.title, datum.authors, datum.publication_date, datum.journal_name,
          datum.category, datum.keywords, datum.abstract, datum.doi, datum.url,
          datum.citation_count, datum.impact_factor, datum.open_access,
          datum.funding_source, datum.methodology, datum.sample_size,
          datum.statistical_significance
        ]
      end
    end
    
    send_data csv_data, filename: "research_data_#{Date.current}.csv", type: 'text/csv'
  end

  def analytics
    # Total count
    total_count = ResearchDatum.count
    
    # By category
    by_category = ResearchDatum.group(:category).count
    
    # By publication month/year using PostgreSQL DATE_TRUNC
    by_publication_date = ResearchDatum.group("DATE_TRUNC('month', publication_date)").count
    
    # Recent additions (last 30 days)
    recent_count = ResearchDatum.where('created_at >= ?', 30.days.ago).count
    
    render json: {
      total_count: total_count,
      by_category: by_category,
      by_publication_date: by_publication_date,
      recent_count: recent_count
    }
  end

  def categories
    # Get all unique categories from the database
    categories = ResearchDatum.distinct.pluck(:category).compact.sort
    
    render json: {
      categories: categories
    }
  end

  private

  def set_research_datum
    @research_datum = ResearchDatum.find(params[:id])
  end

  def research_datum_params
    params.require(:research_datum).permit(
      :title, :author, :publication_date, :journal, :category,
      :keywords, :abstract, :doi, :url, :volume, :issue, :pages,
      :methodology, :results, :conclusions, :notes
    )
  end
end
