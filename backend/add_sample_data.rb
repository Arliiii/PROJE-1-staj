#!/usr/bin/env ruby

# Add sample data to the database
require_relative 'config/environment'

puts "Adding sample research data..."

sample_data = [
  {
    title: 'Machine Learning in Healthcare: A Comprehensive Review',
    author: 'John Doe, Jane Smith, Bob Wilson',
    publication_date: Date.parse('2024-01-15'),
    journal: 'Journal of Medical AI',
    category: 'Technology',
    keywords: 'machine learning, healthcare, artificial intelligence, medical diagnosis',
    abstract: 'This comprehensive review examines the current applications and future potential of machine learning technologies in healthcare settings. We analyze various ML algorithms and their effectiveness in medical diagnosis, treatment planning, and patient monitoring.',
    doi: '10.1234/jmai.2024.001',
    url: 'https://example.com/ml-healthcare'
  },
  {
    title: 'Climate Change Impact on Marine Ecosystems',
    author: 'Alice Johnson, Mike Brown',
    publication_date: Date.parse('2023-11-20'),
    journal: 'Environmental Science Quarterly',
    category: 'Environment',
    keywords: 'climate change, marine biology, ecosystem, ocean temperature',
    abstract: 'This study investigates the long-term effects of rising ocean temperatures on marine biodiversity and ecosystem stability. Our research spans 20 years of data collection from various oceanic regions.',
    doi: '10.1234/esq.2023.112',
    url: 'https://example.com/climate-marine'
  },
  {
    title: 'Advanced Neural Networks for Natural Language Processing',
    author: 'Dr. Sarah Chen, Prof. David Lee',
    publication_date: Date.parse('2024-03-10'),
    journal: 'Computer Science Review',
    category: 'Technology',
    keywords: 'neural networks, NLP, deep learning, transformers',
    abstract: 'We present novel architectures for neural networks specifically designed for natural language processing tasks. Our approach demonstrates significant improvements in language understanding and generation.',
    doi: '10.1234/csr.2024.045',
    url: 'https://example.com/neural-nlp'
  },
  {
    title: 'Sustainable Energy Solutions for Urban Development',
    author: 'Emily Rodriguez, James Taylor',
    publication_date: Date.parse('2024-02-05'),
    journal: 'Renewable Energy Journal',
    category: 'Engineering',
    keywords: 'sustainable energy, urban planning, renewable resources, solar power',
    abstract: 'This research explores innovative sustainable energy solutions for modern urban development. We examine the integration of renewable energy systems in city infrastructure and their long-term viability.',
    doi: '10.1234/rej.2024.023',
    url: 'https://example.com/sustainable-energy'
  },
  {
    title: 'Social Media Impact on Mental Health in Teenagers',
    author: 'Dr. Lisa Park, Michael Green, Anna Wilson',
    publication_date: Date.parse('2023-12-08'),
    journal: 'Psychology Today Research',
    category: 'Social Sciences',
    keywords: 'social media, mental health, teenagers, digital wellness',
    abstract: 'A longitudinal study examining the correlation between social media usage patterns and mental health outcomes in teenagers aged 13-18. Our findings reveal significant relationships between usage duration and psychological well-being.',
    doi: '10.1234/ptr.2023.089',
    url: 'https://example.com/social-media-mental-health'
  }
]

created_count = 0

sample_data.each do |data|
  begin
    research_datum = ResearchDatum.create!(data)
    created_count += 1
    puts "✓ Created: #{research_datum.title}"
  rescue => e
    puts "✗ Failed to create: #{data[:title]} - #{e.message}"
  end
end

puts "\n#{created_count} research records created successfully!"
puts "Total records in database: #{ResearchDatum.count}"