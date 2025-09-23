class Api::V1::ResearchDataController < Api::V1::BaseController
  before_action :set_research_datum, only: [:show, :update, :destroy]

  # GET /api/v1/research_data
  def index
    @research_data = ResearchDatum.all
    
    # Apply search filter (SQLite compatible)
    if params[:search].present?
      @research_data = @research_data.where(
        "title LIKE ? OR author LIKE ? OR keywords LIKE ?", 
        "%#{params[:search]}%", 
        "%#{params[:search]}%",
        "%#{params[:search]}%"
      )
    end
    
    # Apply category filter
    if params[:category].present?
      @research_data = @research_data.where(category: params[:category])
    end

    # Apply date filters
    if params[:date_from].present?
      @research_data = @research_data.where('publication_date >= ?', params[:date_from])
    end
    
    if params[:date_to].present?
      @research_data = @research_data.where('publication_date <= ?', params[:date_to])
    end
    
    # Pagination
    page = (params[:page] || 1).to_i
    per_page = (params[:per_page] || 10).to_i
    per_page = [per_page, 100].min # Limit max per_page to 100
    
    total_count = @research_data.count
    total_pages = (total_count.to_f / per_page).ceil
    
    offset = (page - 1) * per_page
    paginated_data = @research_data.limit(per_page).offset(offset)
    
    render json: {
      data: paginated_data.map do |item|
        {
          id: item.id,
          title: item.title,
          author: item.author,
          category: item.category,
          keywords: item.keywords,
          publication_date: item.publication_date,
          abstract: item.abstract,
          methodology: item.methodology,
          results: item.results,
          conclusions: item.conclusions,
          journal: item.journal,
          volume: item.volume,
          issue: item.issue,
          pages: item.pages,
          doi: item.doi,
          url: item.url,
          notes: item.notes,
          created_at: item.created_at,
          updated_at: item.updated_at
        }
      end,
      total_count: total_count,
      total_pages: total_pages,
      current_page: page,
      per_page: per_page,
      # Add aliases for frontend compatibility
      currentPage: page,
      totalPages: total_pages,
      meta: {
        total_count: total_count
      }
    }
  end

  # GET /api/v1/research_data/1
  def show
    render json: {
      id: @research_datum.id,
      title: @research_datum.title,
      author: @research_datum.author,
      category: @research_datum.category,
      keywords: @research_datum.keywords,
      publication_date: @research_datum.publication_date,
      abstract: @research_datum.abstract,
      methodology: @research_datum.methodology,
      results: @research_datum.results,
      conclusions: @research_datum.conclusions,
      journal: @research_datum.journal,
      volume: @research_datum.volume,
      issue: @research_datum.issue,
      pages: @research_datum.pages,
      doi: @research_datum.doi,
      url: @research_datum.url,
      notes: @research_datum.notes,
      created_at: @research_datum.created_at,
      updated_at: @research_datum.updated_at
    }
  end

  # POST /api/v1/research_data
  def create
    @research_datum = ResearchDatum.new(research_datum_params)

    if @research_datum.save
      render json: {
        id: @research_datum.id,
        title: @research_datum.title,
        author: @research_datum.author,
        category: @research_datum.category,
        keywords: @research_datum.keywords,
        publication_date: @research_datum.publication_date,
        abstract: @research_datum.abstract,
        methodology: @research_datum.methodology,
        results: @research_datum.results,
        conclusions: @research_datum.conclusions,
        journal: @research_datum.journal,
        volume: @research_datum.volume,
        issue: @research_datum.issue,
        pages: @research_datum.pages,
        doi: @research_datum.doi,
        url: @research_datum.url,
        notes: @research_datum.notes,
        created_at: @research_datum.created_at,
        updated_at: @research_datum.updated_at
      }, status: :created
    else
      render json: {
        errors: @research_datum.errors.full_messages,
        details: @research_datum.errors.messages
      }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/research_data/1
  def update
    if @research_datum.update(research_datum_params)
      render json: {
        id: @research_datum.id,
        title: @research_datum.title,
        author: @research_datum.author,
        category: @research_datum.category,
        keywords: @research_datum.keywords,
        publication_date: @research_datum.publication_date,
        abstract: @research_datum.abstract,
        methodology: @research_datum.methodology,
        results: @research_datum.results,
        conclusions: @research_datum.conclusions,
        journal: @research_datum.journal,
        volume: @research_datum.volume,
        issue: @research_datum.issue,
        pages: @research_datum.pages,
        doi: @research_datum.doi,
        url: @research_datum.url,
        notes: @research_datum.notes,
        created_at: @research_datum.created_at,
        updated_at: @research_datum.updated_at
      }
    else
      render json: {
        errors: @research_datum.errors.full_messages,
        details: @research_datum.errors.messages
      }, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/research_data/1
  def destroy
    @research_datum.destroy
    head :no_content
  end

  # GET /api/v1/research_data/analytics
  def analytics
    total_count = ResearchDatum.count
    
    by_category = ResearchDatum.group(:category).count
    
    # For SQLite compatibility
    by_month = ResearchDatum.group("strftime('%Y-%m', publication_date)").count
    
    recent_additions = ResearchDatum.where('created_at >= ?', 30.days.ago).count

    render json: {
      total_count: total_count,
      by_category: by_category,
      by_month: by_month,
      recent_additions: recent_additions
    }
  end

  # GET /api/v1/research_data/categories
  def categories
    categories = ResearchDatum.distinct.pluck(:category).compact.sort
    render json: { categories: categories }
  end

  private

  def set_research_datum
    @research_datum = ResearchDatum.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: {
      error: "Record not found",
      message: "Couldn't find ResearchDatum with 'id'=#{params[:id]}"
    }, status: :not_found
  end

  def research_datum_params
    # For API endpoints, we'll accept both nested and flat parameters
    if params[:research_datum].present?
      params.require(:research_datum).permit(:title, :author, :category, :keywords, :publication_date, :abstract, :methodology, :results, :conclusions, :journal, :volume, :issue, :pages, :doi, :url, :notes)
    else
      params.permit(:title, :author, :category, :keywords, :publication_date, :abstract, :methodology, :results, :conclusions, :journal, :volume, :issue, :pages, :doi, :url, :notes)
    end
  end
end
