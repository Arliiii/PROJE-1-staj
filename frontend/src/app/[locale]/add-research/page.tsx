'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { apiService, type ResearchDatum } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { PlusCircle, Calendar, User, BookOpen, Tag } from 'lucide-react';

export default function AddResearchPage() {
  const t = useTranslations('add');
  const tCommon = useTranslations('common');
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    keywords: '',
    publication_date: '',
    abstract: '',
    methodology: '',
    results: '',
    conclusions: '',
    journal: '',
    volume: '',
    issue: '',
    pages: '',
    doi: '',
    url: '',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const createMutation = useMutation({
    mutationFn: (data: Omit<ResearchDatum, 'id' | 'created_at' | 'updated_at'>) =>
      apiService.createResearchData(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['research-data'] });
      setFormData({
        title: '',
        author: '',
        category: '',
        keywords: '',
        publication_date: '',
        abstract: '',
        methodology: '',
        results: '',
        conclusions: '',
        journal: '',
        volume: '',
        issue: '',
        pages: '',
        doi: '',
        url: '',
        notes: ''
      });
      setErrors({});
      alert(t('success'));
    },
    onError: (error: any) => {
      if (error.response?.data?.details) {
        setErrors(error.response.data.details);
      }
    },
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = t('validation.titleRequired');
    }

    if (!formData.author.trim()) {
      newErrors.author = t('validation.authorsRequired');
    }

    if (!formData.category.trim()) {
      newErrors.category = t('validation.categoryRequired');
    }

    if (!formData.publication_date) {
      newErrors.publication_date = t('validation.yearRequired');
    }

    const currentYear = new Date().getFullYear();
    const year = parseInt(formData.publication_date);
    if (formData.publication_date && (year < 1900 || year > currentYear + 1)) {
      newErrors.publication_date = t('validation.yearInvalid');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const submitData = {
        ...formData,
        publication_date: formData.publication_date + '-01-01', // Convert year to full date
      };
      createMutation.mutate(submitData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <PlusCircle className="w-8 h-8 text-blue-600" />
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600">{t('subtitle')}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800">
              {t('form.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('form.title')} *
                </label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder={t('form.titlePlaceholder')}
                  className={errors.title ? 'border-red-500' : ''}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              {/* Author */}
              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  {t('form.authors')} *
                </label>
                <Input
                  id="author"
                  name="author"
                  type="text"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder={t('form.authorsPlaceholder')}
                  className={errors.author ? 'border-red-500' : ''}
                />
                {errors.author && (
                  <p className="mt-1 text-sm text-red-600">{errors.author}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Publication Year */}
                <div>
                  <label htmlFor="publication_date" className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    {t('form.year')} *
                  </label>
                  <Input
                    id="publication_date"
                    name="publication_date"
                    type="number"
                    min="1900"
                    max={new Date().getFullYear() + 1}
                    value={formData.publication_date}
                    onChange={handleChange}
                    className={errors.publication_date ? 'border-red-500' : ''}
                  />
                  {errors.publication_date && (
                    <p className="mt-1 text-sm text-red-600">{errors.publication_date}</p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    <Tag className="w-4 h-4 inline mr-1" />
                    {t('form.category')} *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.category ? 'border-red-500' : ''}`}
                  >
                    <option value="">{t('form.categoryPlaceholder')}</option>
                    <option value="Technology">Technology</option>
                    <option value="Science">Science</option>
                    <option value="Medicine">Medicine</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Social Sciences">Social Sciences</option>
                    <option value="Humanities">Humanities</option>
                    <option value="Business">Business</option>
                    <option value="Education">Education</option>
                    <option value="Environment">Environment</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                  )}
                </div>
              </div>

              {/* Keywords */}
              <div>
                <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('form.keywords')}
                </label>
                <Input
                  id="keywords"
                  name="keywords"
                  type="text"
                  value={formData.keywords}
                  onChange={handleChange}
                  placeholder={t('form.keywordsPlaceholder')}
                />
              </div>

              {/* Journal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label htmlFor="journal" className="block text-sm font-medium text-gray-700 mb-2">
                    <BookOpen className="w-4 h-4 inline mr-1" />
                    {t('form.journal')}
                  </label>
                  <Input
                    id="journal"
                    name="journal"
                    type="text"
                    value={formData.journal}
                    onChange={handleChange}
                    placeholder={t('form.journalPlaceholder')}
                  />
                </div>

                <div>
                  <label htmlFor="volume" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('form.volume')}
                  </label>
                  <Input
                    id="volume"
                    name="volume"
                    type="text"
                    value={formData.volume}
                    onChange={handleChange}
                    placeholder={t('form.volumePlaceholder')}
                  />
                </div>

                <div>
                  <label htmlFor="issue" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('form.issue')}
                  </label>
                  <Input
                    id="issue"
                    name="issue"
                    type="text"
                    value={formData.issue}
                    onChange={handleChange}
                    placeholder={t('form.issuePlaceholder')}
                  />
                </div>

                <div>
                  <label htmlFor="pages" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('form.pages')}
                  </label>
                  <Input
                    id="pages"
                    name="pages"
                    type="text"
                    value={formData.pages}
                    onChange={handleChange}
                    placeholder={t('form.pagesPlaceholder')}
                  />
                </div>
              </div>

              {/* DOI and URL */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="doi" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('form.doi')}
                  </label>
                  <Input
                    id="doi"
                    name="doi"
                    type="text"
                    value={formData.doi}
                    onChange={handleChange}
                    placeholder={t('form.doiPlaceholder')}
                  />
                </div>

                <div>
                  <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('form.url')}
                  </label>
                  <Input
                    id="url"
                    name="url"
                    type="url"
                    value={formData.url}
                    onChange={handleChange}
                    placeholder={t('form.urlPlaceholder')}
                  />
                </div>
              </div>

              {/* Abstract */}
              <div>
                <label htmlFor="abstract" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('form.abstract')}
                </label>
                <textarea
                  id="abstract"
                  name="abstract"
                  rows={4}
                  value={formData.abstract}
                  onChange={handleChange}
                  placeholder={t('form.abstractPlaceholder')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Methodology */}
              <div>
                <label htmlFor="methodology" className="block text-sm font-medium text-gray-700 mb-2">
                  Methodology
                </label>
                <textarea
                  id="methodology"
                  name="methodology"
                  rows={3}
                  value={formData.methodology}
                  onChange={handleChange}
                  placeholder="Enter research methodology"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Results */}
              <div>
                <label htmlFor="results" className="block text-sm font-medium text-gray-700 mb-2">
                  Results
                </label>
                <textarea
                  id="results"
                  name="results"
                  rows={3}
                  value={formData.results}
                  onChange={handleChange}
                  placeholder="Enter research results"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Conclusions */}
              <div>
                <label htmlFor="conclusions" className="block text-sm font-medium text-gray-700 mb-2">
                  Conclusions
                </label>
                <textarea
                  id="conclusions"
                  name="conclusions"
                  rows={3}
                  value={formData.conclusions}
                  onChange={handleChange}
                  placeholder="Enter research conclusions"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Notes */}
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('form.notes')}
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder={t('form.notesPlaceholder')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => window.history.back()}
                >
                  {tCommon('cancel')}
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={createMutation.isPending}
                  className="min-w-[150px]"
                >
                  {createMutation.isPending ? tCommon('loading') : t('submit')}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}