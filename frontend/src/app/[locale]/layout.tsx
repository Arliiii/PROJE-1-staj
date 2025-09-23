'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, use, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, Search, FileText, Home, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { NextIntlClientProvider } from 'next-intl';
import AddResearchForm from '@/components/AddResearchForm';

const inter = Inter({ subsets: ['latin'] });

export default function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Unwrap the params Promise using React.use()
  const { locale } = use(params);
  
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60000, // 1 minute
        retry: 1,
      },
    },
  }));
  
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const pathname = usePathname();
  
  // Import messages dynamically
  const [messages, setMessages] = useState<any>(null);
  
  useEffect(() => {
    // Validate locale before importing
    const validLocales = ['en', 'tr'];
    const validLocale = validLocales.includes(locale) ? locale : 'en';
    
    import(`../../../messages/${validLocale}.json`).then((msgs) => {
      setMessages(msgs.default);
    }).catch((error) => {
      console.error('Failed to load messages for locale:', validLocale, error);
      // Fallback to English
      import(`../../../messages/en.json`).then((msgs) => {
        setMessages(msgs.default);
      });
    });
  }, [locale]);

  if (!messages) {
    return (
      <html lang={locale}>
        <body className={inter.className}>
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <QueryClientProvider client={queryClient}>
            <LayoutContent 
              locale={locale} 
              isAddFormOpen={isAddFormOpen} 
              setIsAddFormOpen={setIsAddFormOpen}
              pathname={pathname}
            >
              {children}
            </LayoutContent>
          </QueryClientProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

function LayoutContent({ 
  children, 
  locale, 
  isAddFormOpen, 
  setIsAddFormOpen,
  pathname 
}: {
  children: React.ReactNode;
  locale: string;
  isAddFormOpen: boolean;
  setIsAddFormOpen: (open: boolean) => void;
  pathname: string;
}) {
  const t = useTranslations('navigation');

  const navigation = [
    { name: t('dashboard'), href: `/${locale}`, icon: Home },
    { name: t('explore'), href: `/${locale}/explore`, icon: Search },
    { name: t('add'), href: `/${locale}/add-research`, icon: Plus },
    { name: t('reports'), href: `/${locale}/reports`, icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">
                Research Data Hub
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-4">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || 
                    (item.href === `/${locale}` && pathname === `/${locale}`);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        'inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                        isActive
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      )}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
              
              {/* Language Switcher */}
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        {/* Mobile navigation */}
        <div className="sm:hidden border-t border-gray-200">
          <div className="px-4 py-2 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || 
                (item.href === `/${locale}` && pathname === `/${locale}`);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  )}
                >
                  <Icon className="h-4 w-4 mr-3" />
                  {item.name}
                </Link>
              );
            })}
            <div className="pt-2">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>

      {/* Add Research Form Modal */}
      <AddResearchForm 
        isOpen={isAddFormOpen} 
        onClose={() => setIsAddFormOpen(false)} 
      />
    </div>
  );
}
