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
      href: '',
      children: [
        { name: 'Introduction', href: '/about' },
        { name: 'History', href: '/about/history' },
        { name: 'Objective', href: '/about/objective' },
        {
          name: 'Our Team',
          href: '/about/team',
          children: [
            { name: 'Board Members', href: '/about/team/board' },
            { name: 'Staff Members', href: '/about/team/staff' },
            { name: 'Our Alumni', href: '/about/team/alumni' },
          ],
        },
      ],
    },
    {
      name: 'Our Work',
      href: '/about/work',
      children: [
        { name: 'Litigation', href: '/work/litigations' },
        { name: 'Legal and Policy Reform', href: '/work/legal-policy-reform' },
        { name: 'Multilingualism', href: '/work/multilingualism' },
        { name: 'Research & Knowledge Building', href: '/work/research' },
        { name: 'Events', href: '/work/events' },
      ],
    },
    {
          name: 'Resources',
          href: '/resources',
          children: [
            { name: 'Legal Resources', href: '/resources/legal' },
            { name: 'Publications', href: '/resources/publications' },
            { name: 'Reports', href: '/resources/reports' },
            { name: 'Academic Resources', href: '/resources/academic-report' },
          ],
        },
    { 
      name: 'Dictionary', 
      href: '/dictionary' 
    },
    {
      name: 'Nepal Pride Parade',
      href: '',
      children: [
        { name: 'Overview', href: '/pride' },
        { name: 'Timeline', href: '/pride/timeline' },
        { name: 'Organizers', href: '/pride/organizers' },
        { name: 'Challenges & Achievements', href: '/pride/challenges' },
        { name: 'Media & Resources', href: '/pride/media' },
      ],
    },
  ],

  ne: [
    { name: 'गृहपृष्ठ', href: '/' },
    {
      name: 'हाम्रो बारेमा',
      href: '',
      children: [
        { name: 'परिचय', href: '/about' },
        { name: 'इतिहास', href: '/about/history' },
        { name: 'उद्देश्य', href: '/about/objective' },
        {
          name: 'हाम्रो टोली',
          href: '',
          children: [
            { name: 'सञ्चालक समिति', href: '/about/team/board' },
            { name: 'कार्य सदस्य', href: '/about/team/staff' },
            { name: 'पूर्व सदस्य', href: '/about/team/alumni' },
          ],
        },
      ],
    },
    {
      name: 'हाम्रा कार्य',
      href: '',
      children: [
        { name: 'मुद्दाहरू', href: '/work/litigations' },
        { name: 'कानूनी तथा नीतिगत सुधार', href: '/work/legal-policy-reform' },
        { name: 'बहुभाषिकता', href: '/work/multilingualism' },
        { name: 'अनुसन्धान तथा ज्ञान निर्माण', href: '/work/research' },
        { name: 'कार्यक्रमहरू', href: '/work/events'},
      ],
    },
    {
      name: 'स्रोतहरू',
      href: '',
      children: [
        { name: 'कानुनी स्रोतहरू', href: '/resources/legal' },
        { name: 'प्रकाशन', href: '/resources/publications' },
        { name: 'प्रतिवेदनहरू', href: '/resources/reports' },
        { name: 'शैक्षिक स्रोतहरू', href: '/resources/academic-report' },
      ],
    },
    { 
      name: 'शब्दकोश', 
      href: '/dictionary' 
    },
    {
      name: 'नेपाल गौरव यात्रा',
      href: '',
      children: [
        { name: 'परिचय', href: '/pride' },
        { name: 'समयरेखा', href: '/pride/timeline' },
        { name: 'आयोजक', href: '/pride/organizers' },
        { name: 'चुनौती र उपलब्धिहरू', href: '/pride/challenges' },
        { name: 'मिडिया र स्रोतहरू', href: '/pride/media' },
      ],
    },
  ],
};
