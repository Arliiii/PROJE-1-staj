import { ResearchDatum } from '@/types/api';

interface ReportFilters {
  category?: string;
  dateFrom?: string;
  dateTo?: string;
}

export class ReportGenerator {
  static generateCSV(data: ResearchDatum[], filters: ReportFilters = {}): void {
    const headers = [
      'ID',
      'Title',
      'Author',
      'Category',
      'Keywords',
      'Journal',
      'Volume',
      'Issue',
      'Pages',
      'Publication Date',
      'DOI',
      'URL',
      'Abstract',
      'Methodology',
      'Results',
      'Conclusions',
      'Notes',
      'Created At'
    ];

    // Helper function to escape CSV values
    const escapeCSV = (value: string | number | null | undefined): string => {
      if (value === null || value === undefined) return '';
      const str = String(value);
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    // Create CSV content
    const csvRows = [
      headers.join(','),
      ...data.map(item => [
        item.id,
        escapeCSV(item.title),
        escapeCSV(item.author),
        escapeCSV(item.category),
        escapeCSV(item.keywords),
        escapeCSV(item.journal),
        escapeCSV(item.volume),
        escapeCSV(item.issue),
        escapeCSV(item.pages),
        item.publication_date,
        escapeCSV(item.doi),
        escapeCSV(item.url),
        escapeCSV(item.abstract),
        escapeCSV(item.methodology),
        escapeCSV(item.results),
        escapeCSV(item.conclusions),
        escapeCSV(item.notes),
        item.created_at
      ].join(','))
    ];

    const csvContent = csvRows.join('\n');

    // Create filename with timestamp
    const timestamp = new Date().toISOString().split('T')[0];
    const filterString = filters.category ? `_${filters.category}` : '';
    const dateString = filters.dateFrom || filters.dateTo ? `_${filters.dateFrom || 'all'}-to-${filters.dateTo || 'all'}` : '';
    const filename = `research_data_report${filterString}${dateString}_${timestamp}.csv`;

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  }

  static generatePDF(data: ResearchDatum[], filters: ReportFilters = {}): void {
    // For PDF generation, you would typically use a library like jsPDF or PDFKit
    // For now, let's create a simple HTML report that can be printed to PDF
    
    const filterString = filters.category ? ` - Category: ${filters.category}` : '';
    const dateString = filters.dateFrom || filters.dateTo ? ` - Date Range: ${filters.dateFrom || 'All'} to ${filters.dateTo || 'All'}` : '';
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Research Data Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #333; border-bottom: 2px solid #333; padding-bottom: 10px; }
            .meta { color: #666; margin-bottom: 20px; }
            .research-item { margin-bottom: 30px; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
            .title { font-weight: bold; font-size: 18px; color: #2563eb; margin-bottom: 5px; }
            .author { color: #059669; font-weight: 500; margin-bottom: 5px; }
            .category { display: inline-block; background: #dbeafe; color: #1e40af; padding: 2px 8px; border-radius: 12px; font-size: 12px; margin-bottom: 10px; }
            .abstract { margin: 10px 0; line-height: 1.6; }
            .details { color: #666; font-size: 14px; }
            @media print { .no-print { display: none; } }
          </style>
        </head>
        <body>
          <h1>Research Data Report</h1>
          <div class="meta">
            <strong>Generated:</strong> ${new Date().toLocaleDateString()}<br>
            <strong>Total Records:</strong> ${data.length}${filterString}${dateString}
          </div>
          
          ${data.map(item => `
            <div class="research-item">
              <div class="title">${item.title}</div>
              <div class="author">by ${item.author}</div>
              <div class="category">${item.category}</div>
              ${item.abstract ? `<div class="abstract"><strong>Abstract:</strong> ${item.abstract}</div>` : ''}
              <div class="details">
                ${item.journal ? `<strong>Journal:</strong> ${item.journal}<br>` : ''}
                ${item.volume ? `<strong>Volume:</strong> ${item.volume} ` : ''}
                ${item.issue ? `<strong>Issue:</strong> ${item.issue}<br>` : ''}
                ${item.pages ? `<strong>Pages:</strong> ${item.pages}<br>` : ''}
                <strong>Publication Date:</strong> ${new Date(item.publication_date).toLocaleDateString()}<br>
                ${item.doi ? `<strong>DOI:</strong> ${item.doi}<br>` : ''}
                ${item.url ? `<strong>URL:</strong> <a href="${item.url}">${item.url}</a><br>` : ''}
                ${item.keywords ? `<strong>Keywords:</strong> ${item.keywords}<br>` : ''}
              </div>
            </div>
          `).join('')}
          
          <div class="no-print" style="margin-top: 30px; text-align: center;">
            <button onclick="window.print()" style="padding: 10px 20px; background: #2563eb; color: white; border: none; border-radius: 5px; cursor: pointer;">
              Print to PDF
            </button>
          </div>
        </body>
      </html>
    `;

    // Open in new window for printing
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(htmlContent);
      newWindow.document.close();
    }
  }
}