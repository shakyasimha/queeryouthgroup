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
      { name: "Legal documents", href: "/resources" },
      { name: "Publications", href: "/publications" },
    ],
    links: [
      { name: "Home", href: "/" },
      { name: "About Us", href: "/about" },
      { name: "Our Team", href: "/team" },
    ],
    socialMedia: [
      { name: "Facebook", icon: "FaFacebook", href: "https://www.facebook.com/QYGnepal" },
      { name: "Instagram", icon: "FaInstagram", href: "https://www.instagram.com/qygnepal/" },
      { name: "Twitter", icon: "FaXTwitter", href: "https://twitter.com/qygnepal/" },
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
      { name: "मुद्दाहरू", href: "/resources" },
      { name: "प्रकाशनहरू", href: "/publications" },
    ],
    links: [
      { name: "गृहपृष्ठ", href: "/" },
      { name: "हाम्रो बारेमा", href: "/about" },
      { name: "हाम्रो टोली", href: "/team" },
    ],
    socialMedia: [
      { name: "फेसबुक", icon: "FaFacebook", href: "https://www.facebook.com/QYGnepal" },
      { name: "इन्स्टाग्राम", icon: "FaInstagram", href: "https://www.instagram.com/qygnepal/" },
      { name: "ट्विटर", icon: "FaXTwitter", href: "https://twitter.com/qygnepal/" },
    ],
    copyright: `© ${new Date().getFullYear()} क्वियर युवा समूह. सर्वाधिकार सुरक्षित।`,
  },
};