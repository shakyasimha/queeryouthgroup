type Language = 'en' | 'np'; // Explicit language type

/**
 * Generates a localized href based on the current language
 * @param href - The original href to localize
 * @param lang - Current language code ('en' or 'np')
 * @returns Localized href string
 * @throws Will throw error if href is not a string
 */
export const getLocalizedHref = (href: string, lang: Language): string => {
  // Input validation
  if (typeof href !== 'string') {
    throw new Error(`Expected string href, got ${typeof href}`);
  }

  // Handle empty/undefined cases
  if (!href.trim()) return '';

  // Preserve external links, hash links, and mailto/tel links
  if (
    href.startsWith('http') ||
    href.startsWith('#') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:')
  ) {
    return href;
  }

  // Handle home route
  if (href === '/') {
    return lang === 'en' ? '/' : '/np';
  }

  // Normalize the href (remove trailing slashes)
  const normalizedHref = href.endsWith('/') ? href.slice(0, -1) : href;

  // Add language prefix for non-English
  return lang === 'en' ? normalizedHref : `/np${normalizedHref}`;
};