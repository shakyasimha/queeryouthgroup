export type NavbarLink = {
  name: string;
  href: string;
  children?: NavbarLink[]; // <-- support dropdowns
};

export type NavbarLinkSection = NavbarLink[];

export type Locale = 'en' | 'ne';

export type NavbarLinks = Record<Locale, NavbarLinkSection>;

export const navbarLinks: NavbarLinks = {
  en: [
    { name: 'Home', href: '/' },
    {
      name: 'About Us',
      href: '/about',
      children: [
        { name: 'Who We Are', href: '/about' },
        { name: 'Our Journey', href: '/journey' },
        { name: 'Our Team', href: '/team' },
      ],
    },
    { name: 'Our Works', href: '/work' },
    { name: 'Legal Resources', href: '/resources' },
    { name: 'Litigations', href: '/litigations' },
    { name: 'Publications', href: '/publications' },
    { name: 'Dictionary', href: '/dictionary' },
    { name: 'Nepal Pride Parade', href: '/pride' },
  ],

  ne: [
    { name: 'गृहपृष्ठ', href: '/' },
    {
      name: 'हाम्रो बारेमा',
      href: '/about',
      children: [
        { name: 'हामी को हौं', href: '/about' },
        { name: 'हाम्रो यात्रा', href: '/about#journey' },
        { name: 'हाम्रो टोली', href: '/team' },
      ],
    },
    { name: 'हाम्रो कार्यहरू', href: '/work' },
    { name: 'कानूनी स्रोतहरू', href: '/resources' },
    { name: 'मुद्दाहरू', href: '/litigations' },
    { name: 'प्रकाशनहरू', href: '/publications' },
    { name: 'शब्दकोश', href: '/dictionary' },
    { name: 'नेपाल गौरव जात्रा', href: '/pride' },
  ],
};
