// Types for API responses
export interface ResearchDatum {
  id: number;
  title: string;
  author: string;
  category: string;
  keywords?: string;
  publication_date: string;
  abstract?: string;
  methodology?: string;
  results?: string;
  conclusions?: string;
  journal?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  url?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  data: T;
  meta?: {
    total_count: number;
  };
}

export interface Analytics {
  total_count: number;
  by_category: Record<string, number>;
  by_month?: Record<string, number>;
  recent_additions: number;
}

export interface Categories {
  categories: string[];
}