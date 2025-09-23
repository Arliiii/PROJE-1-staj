# Research Data Management System

A full-stack research data management system built with Rails API backend and Next.js frontend.

## Features

### Backend (Rails 8.x API)
- **RESTful API** for research data management
- **Full CRUD operations** (Create, Read, Update, Delete)
- **Advanced search and filtering** capabilities
- **Data validation** and error handling
- **Analytics endpoints** for dashboard insights
- **Database indexes** for optimal performance
- **Comprehensive test suite**

### Frontend (Next.js 15 with TypeScript)
- **Beautiful Dashboard** with analytics cards and charts
- **Search & Filter Interface** for exploring research data
- **Report Generation** with export capabilities
- **Responsive Design** that works on all devices
- **Real-time Data Visualization** using Recharts
- **Modern UI Components** with Tailwind CSS
- **Form Management** for adding/editing research data

### Key Pages
1. **Dashboard** - Overview with statistics, charts, and recent research
2. **Explore** - Search and filter through research database
3. **Reports** - Generate and export comprehensive reports
4. **Add Research** - Modal form for adding new research data

## Tech Stack

### Backend
- **Ruby on Rails 8.x** - API framework
- **SQLite** - Database (development)
- **Puma** - Web server
- **RSpec** - Testing framework

### Frontend
- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Query** - Data fetching and caching
- **Recharts** - Data visualization
- **Lucide React** - Icons

## Getting Started

### Prerequisites
- Ruby 3.4+ 
- Node.js 18+
- npm or yarn

### Backend Setup
```bash
cd backend
bundle install
rails db:create db:migrate db:seed
rails server -p 3001
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001

## API Endpoints

### Research Data
- `GET /research_data` - List all research data (with pagination, search, filters)
- `POST /research_data` - Create new research data
- `GET /research_data/:id` - Get specific research data
- `PUT /research_data/:id` - Update research data
- `DELETE /research_data/:id` - Delete research data

### Analytics
- `GET /analytics` - Get analytics data for dashboard
- `GET /categories` - Get all available categories

### Query Parameters
- `search` - Search in title, author, abstract
- `category` - Filter by category
- `date_from` / `date_to` - Date range filtering
- `page` / `per_page` - Pagination

## Data Model

The `ResearchDatum` model includes:
- **Required fields**: title, author, category, publication_date
- **Optional fields**: journal, volume, issue, pages, doi, abstract, keywords, url, notes
- **Validations**: Length constraints, presence validations
- **Indexes**: Optimized for search and filtering

## Features in Detail

### Dashboard Analytics
- Total research count
- Category distribution
- Recent additions tracking
- Visual charts (bar and pie charts)
- Recent research display

### Search & Filtering
- Full-text search across multiple fields
- Category filtering
- Date range filtering
- Real-time results
- Pagination support

### Report Generation
- PDF and CSV export capabilities
- Filtered data reports
- Quick report templates
- Date range analysis

### Form Management
- Comprehensive add/edit forms
- Real-time validation
- Modal interface
- Required field indicators

## Development

### Running Tests (Backend)
```bash
cd backend
bundle exec rspec
```

### Code Quality
- **ESLint** for frontend code quality
- **RuboCop** for backend code quality
- **TypeScript** for type safety
- **Responsive design** testing

## Deployment

This project is ready for deployment to platforms like:
- **Vercel** (Frontend)
- **Heroku** (Backend)
- **Railway** (Full-stack)
- **DigitalOcean** (VPS)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if needed
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

For questions or support, please contact the development team.
# PROJE-1-staj
