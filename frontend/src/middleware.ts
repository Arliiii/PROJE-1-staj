import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'tr'],

  // Used when no locale matches
  defaultLocale: 'en',
  
  // Always redirect to add the locale prefix
  localePrefix: 'always'
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(tr|en)/:path*']
};