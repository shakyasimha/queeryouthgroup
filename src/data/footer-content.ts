export type FooterContentSection = {
  title: string;
  address: string;
  email: string;
  phone: string;
  sections: {
    resources: string;
    links: string;
    connect: string;
  };
  resources: { name: string; href: string }[];
  links: { name: string; href: string }[];
  socialMedia: { name: string; icon: string; href: string }[];
  copyright: string;
};

export type Locale = 'en' | 'ne';

export type FooterContent = Record<Locale, FooterContentSection>;

export const footerContent: FooterContent = {
  en: {
    title: "Queer Youth Group",
    address: "Yala Dhwakha (Patandhoka), Lalitpur-11, Nepal",
    email: "communications.qyg@gmail.com",
    phone: "+977 9851350665",
    sections: {
      resources: "Resources",
      links: "Links",
      connect: "Connect With Us",
    },
    resources: [
      { name: "SOGEISC Dictionary", href: "/dictionary" },
      { name: "Publications", href: "/resources/publications" },
      { name: "Legal Resources", href: "/resources/legal" },
      { name: "Reports", href: "/resources/reports" },
      { name: "Academic Resources", href: "/resources/academic-report" },
    ],
    links: [
      { name: "Home", href: "/" },
      { name: "About Us", href: "/about" },
      { name: "Our Team", href: "/about/team" },
      { name: "Nepal Pride Parade", href: "/pride" },
    ],
    socialMedia: [
      { name: "Facebook", icon: "FaFacebook", href: "https://www.facebook.com/QYGnepal" },
      { name: "Instagram", icon: "FaInstagram", href: "https://www.instagram.com/qygnepal/" },
      { name: "Twitter", icon: "FaXTwitter", href: "https://twitter.com/qygnepal/" },
      { name: "Tiktok", icon: "FaTiktok", href: "https://www.tiktok.com/@queeryouthgroup/"}
    ],
    copyright: `© ${new Date().getFullYear()} Queer Youth Group. All rights reserved.`,
  },
  ne: {
    title: "क्वेयर युथ ग्रुप",
    address: "यल ध्वखा (पाटनधोका), ललितपुर-११, नेपाल",
    email: "communications.qyg@gmail.com",
    phone: "+९७७ ९८५१३५०६६५",
    sections: {
      resources: "स्रोतहरू",
      links: "लिङ्कहरू",
      connect: "हामीसित जोड्नुहोस्",
    },
    resources: [
      { name: "SOGEISC शब्दकोश", href: "/dictionary" },
      { name: "प्रकाशन", href: "/resources/publications" },
      { name: "कानुनी स्रोत", href: "/resources/legal" },
      { name: "प्रतिवेदन", href: "/resources/reports" },
      { name: "शैक्षिक स्रोत", href: "/resources/academic-report" },
    ],
    links: [
      { name: "गृहपृष्ठ", href: "/" },
      { name: "हाम्रो बारेमा", href: "/about" },
      { name: "हाम्रो टोली", href: "/about/team" },
      { name: "नेपाल गौरव यात्रा", href: "/pride" },

    ],
    socialMedia: [
      { name: "फेसबुक", icon: "FaFacebook", href: "https://www.facebook.com/QYGnepal" },
      { name: "इन्स्टाग्राम", icon: "FaInstagram", href: "https://www.instagram.com/qygnepal/" },
      { name: "ट्विटर", icon: "FaXTwitter", href: "https://twitter.com/qygnepal/" },
      { name: "टिकटक", icon: "FaTiktok", href: "https://www.tiktok.com/@queeryouthgroup/"}
    ],
    copyright: `© ${new Date().getFullYear()} क्वेयर युथ ग्रुप। सर्वाधिकार सुरक्षित।`,
  },
};