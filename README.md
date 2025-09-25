# Research Data Management System

A full-stack research data management system built with Rails API backend and Next.js frontend.
web: https://proje-1-staj.vercel.app/en
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

## 🔬 Research Data Management System

A comprehensive full-stack web application for managing research publications and data with multilingual support (English/Turkish).

### 🏗️ **Architecture**

```
📁 staj-proje-1/
├── 📁 backend/          # Rails 8 API Server
└── 📁 frontend/         # Next.js 15 Client Application
```

## 🚀 **Features**

### 📊 **Core Functionality**
- ✅ **Research Data Management**: Complete CRUD operations for research publications
- 📈 **Analytics Dashboard**: Visual charts and statistics
- 🔍 **Advanced Search & Filtering**: Search by title, author, category, keywords
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 🌍 **Internationalization**: Full English/Turkish language support

### 🗃️ **Data Fields**
- **Basic Information**: Title, Author(s), Publication Year, Category, Keywords
- **Journal Details**: Journal Name, Volume, Issue, Pages, DOI, URL
- **Research Content**: Abstract, Methodology, Results, Conclusions, Notes

### 📊 **Reports & Analytics**
- 📈 **Dashboard Statistics**: Total research count, categories, recent activity
- 📊 **Visual Charts**: Bar charts and pie charts for data visualization
- 📄 **Export Options**: CSV and PDF report generation
- 🔍 **Filtering**: Date range and category-based filtering

## 🛠️ **Technology Stack**

### 🖥️ **Backend (Rails API)**
- **Framework**: Ruby on Rails 8.0.2.1
- **Database**: SQLite3 (development)
- **Authentication**: API-based
- **CORS**: Enabled for frontend communication
- **Testing**: Minitest with comprehensive test coverage

### 🌐 **Frontend (Next.js)**
- **Framework**: Next.js 15.5.3 with Turbopack
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **Charts**: Recharts for data visualization
- **Internationalization**: next-intl
- **UI Components**: Custom component library

## 🚀 **Quick Start**

### 📋 **Prerequisites**
- Node.js 18+ and npm
- Ruby 3.4+ and Rails 8+
- Git

### 🔧 **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/Arliiii/PROJE-1-staj.git
cd PROJE-1-staj
```

2. **Setup Backend (Rails API)**
```bash
cd backend
bundle install
rails db:setup
rails db:seed
rails server -p 3001
```

3. **Setup Frontend (Next.js) - New Terminal**
```bash
cd frontend
npm install
npm run dev
```

### 🌐 **Access the Application**
- **Frontend**: http://localhost:3000 (English) or http://localhost:3000/tr (Turkish)
- **Backend API**: http://localhost:3001/api/v1/research_data

## 📁 **Project Structure**

### 🔧 **Backend Structure**
```
backend/
├── app/
│   ├── controllers/api/v1/     # API controllers
│   ├── models/                 # ActiveRecord models
│   └── views/                  # Email templates
├── config/
│   ├── initializers/cors.rb    # CORS configuration
│   └── routes.rb               # API routes
├── db/
│   ├── migrate/                # Database migrations
│   └── seeds.rb                # Sample data
└── test/                       # Test suite
```

### 🎨 **Frontend Structure**
```
frontend/
├── src/
│   ├── app/[locale]/           # Internationalized pages
│   ├── components/             # Reusable UI components
│   ├── lib/                    # Utilities and API client
│   ├── messages/               # Translation files
│   └── types/                  # TypeScript definitions
├── public/                     # Static assets
└── package.json                # Dependencies
```

## 🔗 **API Endpoints**

### 📊 **Research Data**
- `GET /api/v1/research_data` - List all research data
- `POST /api/v1/research_data` - Create new research entry
- `GET /api/v1/research_data/:id` - Get specific research entry
- `PUT /api/v1/research_data/:id` - Update research entry
- `DELETE /api/v1/research_data/:id` - Delete research entry

### 📈 **Analytics**
- `GET /api/v1/research_data/analytics` - Get dashboard statistics
- `GET /api/v1/research_data/categories` - Get available categories

## 🌍 **Internationalization**

### 🗣️ **Supported Languages**
- 🇺🇸 **English** (en) - Default language
- 🇹🇷 **Turkish** (tr) - Complete translation

### 🔄 **Language Switching**
- **URL-based routing**: `/en/` and `/tr/` paths
- **Language dropdown**: Switch between languages in navigation
- **Persistent selection**: Language preference maintained across sessions

## 🧪 **Testing**

### 🔍 **Backend Tests**
```bash
cd backend
rails test
```

### ✅ **Test Coverage**
- Model validations and scopes
- API endpoint functionality
- Error handling and edge cases

## 📦 **Deployment**

### 🐳 **Docker Support**
- Backend includes Dockerfile and Docker configuration
- Kamal deployment configuration included

### 🚀 **Production Considerations**
- Environment variables for configuration
- Database migrations for production
- CORS configuration for production domains

## 👥 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 **License**

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 **Contact**

- **Author**: Arli
- **GitHub**: [@Arliiii](https://github.com/Arliiii)
- **Repository**: [PROJE-1-staj](https://github.com/Arliiii/PROJE-1-staj)

---

### 🎯 **Development Status**
- ✅ **Backend API**: Complete with full CRUD operations
- ✅ **Frontend Interface**: Responsive design with internationalization
- ✅ **Database Schema**: Complete with all required fields
- ✅ **Reports System**: CSV and PDF generation
- ✅ **Testing**: Comprehensive test coverage
- ✅ **Documentation**: Complete setup and usage instructions
