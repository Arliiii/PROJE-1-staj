# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Clear existing data
ResearchDatum.destroy_all

# Create sample research data
research_data = [
  {
    title: "Machine Learning Applications in Healthcare",
    author: "Dr. Sarah Johnson",
    category: "Computer Science",
    keywords: "machine learning, healthcare, AI, medical diagnosis",
    publication_date: Date.new(2024, 3, 15),
    abstract: "This research explores the application of machine learning algorithms in healthcare diagnosis and treatment optimization.",
    methodology: "We conducted a systematic review of ML applications and implemented three different algorithms for medical image analysis.",
    results: "The ML models achieved 94% accuracy in diagnostic predictions, outperforming traditional methods by 12%.",
    conclusions: "Machine learning shows significant promise in improving healthcare outcomes and diagnostic accuracy."
  },
  {
    title: "Climate Change Impact on Marine Ecosystems",
    author: "Prof. Michael Chen",
    category: "Biology",
    keywords: "climate change, marine biology, ecosystems, ocean temperature",
    publication_date: Date.new(2024, 2, 10),
    abstract: "An analysis of how rising ocean temperatures affect marine biodiversity and ecosystem balance.",
    methodology: "Long-term data collection from 50 marine monitoring stations across the Pacific Ocean over 10 years.",
    results: "Ocean temperatures increased by 1.2°C on average, resulting in 15% species migration and 8% coral bleaching.",
    conclusions: "Urgent conservation measures are needed to protect marine ecosystems from climate change impacts."
  },
  {
    title: "Quantum Computing Algorithms for Cryptography",
    author: "Dr. Elena Rodriguez",
    category: "Computer Science",
    keywords: "quantum computing, cryptography, security, algorithms",
    publication_date: Date.new(2024, 4, 22),
    abstract: "Development of new quantum algorithms for enhanced cryptographic security systems.",
    methodology: "Mathematical modeling and simulation of quantum algorithms using IBM Quantum simulators.",
    results: "New algorithms demonstrated 1000x faster encryption/decryption compared to classical methods.",
    conclusions: "Quantum cryptography represents the future of secure communications in the digital age."
  },
  {
    title: "Sustainable Energy Storage Solutions",
    author: "Dr. James Wilson",
    category: "Engineering",
    keywords: "renewable energy, battery technology, sustainability, energy storage",
    publication_date: Date.new(2024, 1, 18),
    abstract: "Research into advanced battery technologies for renewable energy storage applications.",
    methodology: "Laboratory testing of lithium-sulfur and solid-state battery prototypes under various conditions.",
    results: "New battery designs achieved 40% longer lifespan and 25% higher energy density than current technologies.",
    conclusions: "Advanced battery technologies are crucial for widespread adoption of renewable energy systems."
  },
  {
    title: "Neural Networks in Natural Language Processing",
    author: "Dr. Amanda Foster",
    category: "Computer Science",
    keywords: "neural networks, NLP, deep learning, language models",
    publication_date: Date.new(2024, 5, 8),
    abstract: "Exploration of transformer architectures for improved natural language understanding and generation.",
    methodology: "Training and evaluation of multiple transformer models on diverse text corpora.",
    results: "Our model achieved state-of-the-art performance on GLUE benchmarks with 3% improvement over previous models.",
    conclusions: "Transformer architectures continue to push the boundaries of natural language processing capabilities."
  },
  {
    title: "Psychological Effects of Remote Work",
    author: "Dr. Robert Kumar",
    category: "Psychology",
    keywords: "remote work, psychology, mental health, workplace productivity",
    publication_date: Date.new(2024, 3, 30),
    abstract: "A comprehensive study on the psychological impact of remote work on employee well-being and productivity.",
    methodology: "Survey of 5000 remote workers across different industries, with psychological assessments and productivity metrics.",
    results: "67% reported improved work-life balance, but 34% experienced increased isolation and stress.",
    conclusions: "Remote work offers benefits but requires structured support systems to address psychological challenges."
  },
  {
    title: "Genetic Markers for Disease Resistance",
    author: "Dr. Lisa Zhang",
    category: "Biology",
    keywords: "genetics, disease resistance, biomarkers, genomics",
    publication_date: Date.new(2024, 2, 25),
    abstract: "Identification of genetic markers associated with natural disease resistance in human populations.",
    methodology: "Genome-wide association study (GWAS) of 10,000 individuals with known disease resistance patterns.",
    results: "Identified 15 novel genetic variants associated with enhanced immune response and disease resistance.",
    conclusions: "These genetic markers could inform personalized medicine approaches and vaccine development strategies."
  },
  {
    title: "Economic Impact of Automation",
    author: "Prof. David Thompson",
    category: "Economics",
    keywords: "automation, economics, employment, technological change",
    publication_date: Date.new(2024, 4, 12),
    abstract: "Analysis of automation's effects on employment patterns and economic growth in developed countries.",
    methodology: "Economic modeling using 20 years of employment and automation data from OECD countries.",
    results: "Automation led to 12% job displacement but created 8% new job categories, with net positive economic growth.",
    conclusions: "Automation requires proactive policy measures to manage workforce transitions and ensure equitable benefits."
  },
  {
    title: "Nanotechnology in Drug Delivery",
    author: "Dr. Maria Gonzalez",
    category: "Medicine",
    keywords: "nanotechnology, drug delivery, pharmacology, medical treatment",
    publication_date: Date.new(2024, 1, 28),
    abstract: "Development of nanoparticle-based drug delivery systems for targeted cancer therapy.",
    methodology: "In-vitro and in-vivo testing of various nanoparticle formulations for drug targeting efficiency.",
    results: "Nanoparticle delivery systems increased drug concentration at tumor sites by 300% while reducing side effects by 60%.",
    conclusions: "Nanotechnology-based drug delivery represents a paradigm shift toward more effective and safer cancer treatments."
  },
  {
    title: "Urban Planning and Social Equity",
    author: "Dr. Jennifer Lee",
    category: "Urban Studies",
    keywords: "urban planning, social equity, community development, public policy",
    publication_date: Date.new(2024, 5, 20),
    abstract: "Examination of how urban planning decisions impact social equity and community well-being.",
    methodology: "Comparative analysis of urban development projects in 25 cities, with socioeconomic impact assessments.",
    results: "Well-planned urban development improved quality of life metrics by 25% and reduced inequality by 18%.",
    conclusions: "Inclusive urban planning is essential for creating equitable and sustainable communities."
  }
]

research_data.each do |data|
  ResearchDatum.create!(data)
end

puts "Created #{ResearchDatum.count} research data entries"
