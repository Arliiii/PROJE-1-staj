'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/lib/api';
import { ReportGenerator } from '@/lib/reportGenerator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { FileText, Download, Calendar, BarChart3, PieChart, TrendingUp } from 'lucide-react';

export default function Reports() {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Get analytics data
  const { data: analytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ['analytics'],
    queryFn: () => apiService.getAnalytics(),
  });

  // Get categories
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => apiService.getCategories(),
  });

  // Extract the categories array from the API response
  const categories = categoriesData?.categories || [];

  // Get filtered data for preview
  const { data: filteredData, isLoading: dataLoading } = useQuery({
    queryKey: ['research-data-filtered', selectedCategory, dateFrom, dateTo],
    queryFn: () => apiService.getResearchData({
      category: selectedCategory || undefined,
      date_from: dateFrom || undefined,
      date_to: dateTo || undefined,
      per_page: 1000 // Get all matching records for report
    }),
    enabled: !!(selectedCategory || dateFrom || dateTo)
  });

  const generateReport = async (format: 'csv' | 'pdf') => {
    setIsGenerating(true);
    try {
      // Get all data matching the current filters
      const allData = await apiService.getResearchData({
        category: selectedCategory || undefined,
        date_from: dateFrom || undefined,
        date_to: dateTo || undefined,
        per_page: 1000 // Get all matching records
      });

      const filters = {
        category: selectedCategory,
        dateFrom,
        dateTo
      };

      if (format === 'csv') {
        ReportGenerator.generateCSV(allData.data, filters);
      } else {
        ReportGenerator.generatePDF(allData.data, filters);
      }

    } catch (error) {
      console.error('Error generating report:', error);
      alert('Error generating report. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const resetFilters = () => {
    setDateFrom('');
    setDateTo('');
    setSelectedCategory('');
  };

  // Calculate preview statistics
  const previewStats = filteredData || { data: [], total_count: analytics?.total_count || 0, meta: { total_count: analytics?.total_count || 0 } };
  const totalCount = previewStats.total_count || previewStats.meta?.total_count || previewStats.data?.length || 0;
  const categoryBreakdown = previewStats.data?.reduce((acc: Record<string, number>, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {}) || {};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        <p className="mt-2 text-gray-600">Generate comprehensive reports from your research data</p>
      </div>

      {/* Report Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Report Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date From
              </label>
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date To
              </label>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                {categories?.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4">
            <Button
              onClick={() => generateReport('pdf')}
              disabled={isGenerating}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              {isGenerating ? 'Generating...' : 'Generate PDF Report'}
            </Button>
            <Button
              variant="outline"
              onClick={() => generateReport('csv')}
              disabled={isGenerating}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              {isGenerating ? 'Generating...' : 'Export CSV'}
            </Button>
            <Button
              variant="outline"
              onClick={resetFilters}
              disabled={isGenerating}
            >
              Reset Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Report Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Summary Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Report Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Records:</span>
              <span className="font-semibold text-lg">
                {dataLoading ? '...' : totalCount}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Categories:</span>
              <span className="font-semibold">
                {Object.keys(categoryBreakdown).length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Date Range:</span>
              <span className="text-sm">
                {dateFrom && dateTo 
                  ? `${dateFrom} to ${dateTo}`
                  : dateFrom 
                  ? `From ${dateFrom}`
                  : dateTo 
                  ? `Until ${dateTo}`
                  : 'All dates'
                }
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Filter:</span>
              <span className="text-sm">
                {selectedCategory || 'All categories'}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Category Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            {dataLoading ? (
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded mb-1"></div>
                  </div>
                ))}
              </div>
            ) : Object.keys(categoryBreakdown).length > 0 ? (
              <div className="space-y-3">
                {Object.entries(categoryBreakdown).map(([category, count]) => (
                  <div key={category} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 truncate">{category}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ 
                            width: `${(count / totalCount) * 100}%` 
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium w-8 text-right">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                {selectedCategory || dateFrom || dateTo 
                  ? 'No data matches your filters' 
                  : 'Configure filters to see breakdown'
                }
              </p>
            )}
          </CardContent>
        </Card>

        {/* Overall Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Overall Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {analyticsLoading ? (
              <div className="space-y-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Database:</span>
                  <span className="font-semibold">{analytics?.total_count || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">All Categories:</span>
                  <span className="font-semibold">
                    {Object.keys(analytics?.by_category || {}).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Recent Additions:</span>
                  <span className="font-semibold">{analytics?.recent_count || 0}</span>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-xs text-gray-500">
                    Last updated: {new Date().toLocaleDateString()}
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Report Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center gap-2"
              onClick={() => {
                resetFilters();
                generateReport('pdf');
              }}
              disabled={isGenerating}
            >
              <FileText className="h-6 w-6" />
              <span className="text-sm">Full Database Report</span>
            </Button>

            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center gap-2"
              onClick={() => {
                const lastMonth = new Date();
                lastMonth.setMonth(lastMonth.getMonth() - 1);
                setDateFrom(lastMonth.toISOString().split('T')[0]);
                setDateTo(new Date().toISOString().split('T')[0]);
                setSelectedCategory('');
              }}
              disabled={isGenerating}
            >
              <Calendar className="h-6 w-6" />
              <span className="text-sm">Last Month Report</span>
            </Button>

            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center gap-2"
              onClick={() => {
                const lastYear = new Date();
                lastYear.setFullYear(lastYear.getFullYear() - 1);
                setDateFrom(lastYear.toISOString().split('T')[0]);
                setDateTo(new Date().toISOString().split('T')[0]);
                setSelectedCategory('');
              }}
              disabled={isGenerating}
            >
              <TrendingUp className="h-6 w-6" />
              <span className="text-sm">Yearly Summary</span>
            </Button>

            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center gap-2"
              onClick={() => generateReport('csv')}
              disabled={isGenerating}
            >
              <Download className="h-6 w-6" />
              <span className="text-sm">Export All Data</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}