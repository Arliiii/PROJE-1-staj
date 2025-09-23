'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/lib/api';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Modal } from './ui/Modal';

interface AddResearchFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddResearchForm({ isOpen, onClose }: AddResearchFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    publication_date: '',
    journal: '',
    volume: '',
    issue: '',
    pages: '',
    doi: '',
    abstract: '',
    keywords: '',
    url: '',
    notes: ''
  });

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: typeof formData) => apiService.createResearchData(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['research-data'] });
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      handleClose();
      alert('Research data added successfully!');
    },
    onError: (error) => {
      console.error('Error creating research data:', error);
      alert('Error adding research data. Please try again.');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title || !formData.author || !formData.category || !formData.publication_date) {
      alert('Please fill in all required fields (Title, Author, Category, Publication Date)');
      return;
    }

    createMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setFormData({
      title: '',
      author: '',
      category: '',
      publication_date: '',
      journal: '',
      volume: '',
      issue: '',
      pages: '',
      doi: '',
      abstract: '',
      keywords: '',
      url: '',
      notes: ''
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add New Research">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Required Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Research title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Author <span className="text-red-500">*</span>
            </label>
            <Input
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Author name"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <Input
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Research category"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Publication Date <span className="text-red-500">*</span>
            </label>
            <Input
              type="date"
              name="publication_date"
              value={formData.publication_date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Optional Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Journal
            </label>
            <Input
              name="journal"
              value={formData.journal}
              onChange={handleChange}
              placeholder="Journal name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Volume
            </label>
            <Input
              name="volume"
              value={formData.volume}
              onChange={handleChange}
              placeholder="Volume"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Issue
            </label>
            <Input
              name="issue"
              value={formData.issue}
              onChange={handleChange}
              placeholder="Issue"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pages
            </label>
            <Input
              name="pages"
              value={formData.pages}
              onChange={handleChange}
              placeholder="e.g., 123-145"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              DOI
            </label>
            <Input
              name="doi"
              value={formData.doi}
              onChange={handleChange}
              placeholder="Digital Object Identifier"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL
          </label>
          <Input
            type="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Abstract
          </label>
          <textarea
            name="abstract"
            value={formData.abstract}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
            placeholder="Research abstract..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Keywords
          </label>
          <Input
            name="keywords"
            value={formData.keywords}
            onChange={handleChange}
            placeholder="keyword1, keyword2, keyword3"
          />
          <p className="text-xs text-gray-500 mt-1">Separate keywords with commas</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
            placeholder="Additional notes..."
          />
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={createMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={createMutation.isPending}
          >
            {createMutation.isPending ? 'Adding...' : 'Add Research'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}