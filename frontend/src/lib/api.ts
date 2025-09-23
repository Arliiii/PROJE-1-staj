import { ResearchDatum, ApiResponse, Analytics, Categories } from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Network error' }));
        throw new Error(error.message || `HTTP ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Research Data endpoints
  async getResearchData(params?: {
    search?: string;
    category?: string;
    date_from?: string;
    date_to?: string;
    page?: number;
    per_page?: number;
  }): Promise<ApiResponse<ResearchDatum[]>> {
    const searchParams = new URLSearchParams();
    if (params?.search) searchParams.set('search', params.search);
    if (params?.category) searchParams.set('category', params.category);
    if (params?.date_from) searchParams.set('date_from', params.date_from);
    if (params?.date_to) searchParams.set('date_to', params.date_to);
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.per_page) searchParams.set('per_page', params.per_page.toString());
    
    const queryString = searchParams.toString();
    return this.request<ApiResponse<ResearchDatum[]>>(
      `/api/v1/research_data${queryString ? `?${queryString}` : ''}`
    );
  }

  async getResearchDataById(id: number): Promise<ResearchDatum> {
    return this.request<ResearchDatum>(`/api/v1/research_data/${id}`);
  }

  async createResearchData(data: Partial<ResearchDatum>): Promise<ResearchDatum> {
    return this.request<ResearchDatum>('/api/v1/research_data', {
      method: 'POST',
      body: JSON.stringify({ research_datum: data }),
    });
  }

  async updateResearchData(id: number, data: Partial<ResearchDatum>): Promise<ResearchDatum> {
    return this.request<ResearchDatum>(`/api/v1/research_data/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ research_datum: data }),
    });
  }

  async deleteResearchData(id: number): Promise<void> {
    return this.request<void>(`/api/v1/research_data/${id}`, {
      method: 'DELETE',
    });
  }

  // Analytics endpoints
  async getAnalytics(): Promise<Analytics> {
    return this.request<Analytics>('/api/v1/research_data/analytics');
  }

  async getCategories(): Promise<Categories> {
    return this.request<Categories>('/api/v1/research_data/categories');
  }
}

export const apiService = new ApiService();