// app/[locale]/pride/timeline/page.tsx
'use client';
import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';

// Type definitions
interface TimelineEventData {
  year: string;
  title?: string;
  date?: string;
  details?: string[];
  hasEvent: boolean;
  slug?: string;
}

interface TimelineEventProps {
  year: string;
  title?: string;
  date?: string;
  details?: string[];
  isLeft: boolean;
  hasEvent: boolean;
  slug?: string;
}

interface Translations {
  title: string;
  subtitle: string;
  footerText: string;
  readMore: string;
}

interface EventData {
  title: string;
  date: string;
  details: string[];
  slug: string;
}

interface EventsRecord {
  [year: string]: EventData;
}

// Timeline Event Component
const TimelineEvent: React.FC<TimelineEventProps> = ({ 
  year, 
  title, 
  date, 
  details, 
  isLeft, 
  hasEvent,
  slug
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const locale = useLocale();
  const t = useTranslations('prideTimelinePage');
  
  const getReadMoreText = () => {
    try {
      return t('readMore');
    } catch {
      return locale === 'ne' ? 'थप पढ्नुहोस्' : 'Read More';
    }
  };

  if (!hasEvent) {
    return (
      <div className="flex items-center mb-8 relative">
        {/* Left side */}
        <div className="flex-1 px-6">
          {!isLeft && (
            <div className="text-right">
              <span className="text-gray-400 font-semibold bg-gray-100 px-3 py-1 rounded-full">
                {year}
              </span>
            </div>
          )}
        </div>
        
        {/* Timeline dot */}
        <div className="w-4 h-4 bg-gray-300 rounded-full border-4 border-white z-10 relative"></div>
        
        {/* Right side */}
        <div className="flex-1 px-6">
          {isLeft && (
            <div className="text-left">
              <span className="text-gray-400 font-semibold bg-gray-100 px-3 py-1 rounded-full">
                {year}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-start mb-8 relative ${isLeft ? 'flex-row-reverse' : ''}`}>
      <div className="flex-1 px-6 relative">
        {/* Normal State - Title and Year */}
        <div 
          className={`cursor-pointer transition-all duration-300 ${isLeft ? 'text-right' : 'text-left'}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className={`inline-block bg-pink-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg hover:bg-pink-700 transition-all duration-300 ${isHovered ? 'transform scale-105' : ''}`}>
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="text-pink-100 text-sm">{year}</p>
          </div>
        </div>

        {/* Hover State - Detailed Card */}
        <div 
          className={`absolute top-0 ${isLeft ? 'right-0' : 'left-0'} w-80 z-20 transition-all duration-300 ${
            isHovered 
              ? 'opacity-100 transform translate-y-0 pointer-events-auto' 
              : 'opacity-0 transform -translate-y-4 pointer-events-none'
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className={`bg-[#F5EFE0] p-6 rounded-lg shadow-lg border-l-4 border-pink-600 ${isLeft ? 'border-r-4 border-l-0' : ''}`}>
            <h3 className="text-xl font-bold text-pink-800 mb-2">{title}</h3>
            {date && (
              <p className="text-pink-700 font-semibold mb-3">{date}</p>
            )}
            {details && details.length > 0 && (
              <div className="text-gray-700 space-y-2 mb-4">
                {details.map((detail: string, index: number) => (
                  <p key={index} className="text-sm leading-relaxed">{detail}</p>
                ))}
              </div>
            )}
            {slug && (
              <div className={`${isLeft ? 'text-right' : 'text-left'}`}>
                <a 
                  href={`/${locale}/pride/timeline/${slug}`}
                  className="inline-flex items-center bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-pink-700 transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  {getReadMoreText()}
                  <svg 
                    className={`w-4 h-4 ${isLeft ? 'mr-2 rotate-180' : 'ml-2'}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            )}
          </div>
          
          {/* Arrow pointing to timeline dot */}
          <div className={`absolute top-6 ${isLeft ? 'left-0 transform -translate-x-2' : 'right-0 transform translate-x-2'}`}>
            <div className={`w-0 h-0 border-t-8 border-b-8 border-transparent ${isLeft ? 'border-r-8 border-r-[#F5EFE0]' : 'border-l-8 border-l-[#F5EFE0]'}`}></div>
          </div>
        </div>
      </div>
      
      <div className="w-4 h-4 bg-pink-600 rounded-full border-4 border-white z-10 relative shadow-md mt-3"></div>
      
      <div className="flex-1"></div>
    </div>
  );
};

// Main Timeline Component
const NepalPrideTimeline: React.FC = () => {
  const locale = useLocale();
  
  // Always call hooks at the top level
  const t = useTranslations('prideTimelinePage');
  
  // Function to get translations with fallbacks
  const getTranslations = (): Translations => {
    try {
      return {
        title: t('title'),
        subtitle: t('subtitle'),
        footerText: t('footerText'),
        readMore: t('readMore')
      };
    } catch {
      // Fallback translations based on locale
      if (locale === 'ne') {
        return {
          title: "नेपाल गौरव यात्राको समयरेखा",
          subtitle: "नेपालमा LGBTQ+ गौरव उत्सवका महत्वपूर्ण घटनाहरूको यात्रा, जसले समुदायिक संगठन र दृश्यताको विकासलाई प्रदर्शन गर्दछ।",
          footerText: "नेपालमा LGBTQ+ अधिकारका लागि विविधता, समानता र निरन्तर संघर्षको उत्सव",
          readMore: "थप पढ्नुहोस्"
        };
      } else {
        return {
          title: "Nepal Pride Parade Timeline",
          subtitle: "A journey through the milestones of LGBTQ+ pride celebrations in Nepal, showcasing the evolution of community organizing and visibility.",
          footerText: "Celebrating diversity, equality, and the ongoing fight for LGBTQ+ rights in Nepal",
          readMore: "Read More"
        };
      }
    }
  };

  // Event data with fallbacks
  const getEventData = (year: string): EventData => {
    try {
      return {
        title: t(`events.${year}.title`),
        date: t(`events.${year}.date`),
        details: [
          t(`events.${year}.details.0`),
          t(`events.${year}.details.1`)
        ],
        slug: t(`events.${year}.slug`)
      };
    } catch {
      // Fallback event data
      const nepaliEvents: EventsRecord = {
        '2019': {
          title: "नेपाल गौरव यात्रा २०१९",
          date: "जुन २९, २०१९",
          details: [
            "क्वेयर युथ ग्रुप (QYG) ले क्वेयर राइट्स कलेक्टिभ (QRC) र क्यामपेन फर चेन्ज (CFC) सँगको सहकार्यमा पहिलो पटक नेपाल गौरव यात्राको आयोजना गर्‍यो।",
            "यस ऐतिहासिक घटनाले नेपालमा संगठित गौरव उत्सवहरूको सुरुवात चिन्ह लगायो।"
          ],
          slug: "nepal-pride-2019"
        },
        '2020': {
          title: "अनलाइन गौरव यात्रा",
          date: "जुन १३, २०२०",
          details: [
            "कोभिड-१९ महामारीको कारण भर्चुअल रूपमा आयोजना गरियो",
            "यो दोस्रो वार्षिक नेपाल गौरव यात्रा हुने थियो"
          ],
          slug: "online-pride-2020"
        },
        '2025': {
          title: "सातौं नेपाल गौरव यात्रा",
          date: "जुन १४, २०२५",
          details: [
            "क्वेयर युथ ग्रुप (QYG) ले क्वेयर राइट्स कलेक्टिभ (QRC) सँगको सहकार्यमा काठमाडौंको नारायण चौर, नक्सालमा सातौं नेपाल गौरव यात्रा (NPP) सफलतापूर्वक आयोजना गर्‍यो।",
            "यस वर्षको गौरव यात्राले एक महत्वपूर्ण कोसेढुङ्गा चिन्ह लगायो किनभने यो पहिलो पटक QYG ले स्वतन्त्र रूपमा कार्यक्रमको समग्र समन्वय र कार्यान्वयनको नेतृत्व गर्‍यो।"
          ],
          slug: "nepal-pride-2025"
        }
      };

      const englishEvents: EventsRecord = {
        '2019': {
          title: "Nepal Pride Parade 2019",
          date: "June 29, 2019",
          details: [
            "Queer Youth Group (QYG) organized the first-ever Nepal Pride Parade in collaboration with Queer Rights Collective (QRC) and Campaign for Change (CFC).",
            "This historic event marked the beginning of organized Pride celebrations in Nepal."
          ],
          slug: "nepal-pride-2019"
        },
        '2020': {
          title: "Online Pride Parade",
          date: "June 13, 2020",
          details: [
            "Held virtually due to the COVID-19 pandemic",
            "Would have been the second annual Nepal Pride Parade"
          ],
          slug: "online-pride-2020"
        },
        '2025': {
          title: "Seventh Nepal Pride Parade",
          date: "June 14, 2025",
          details: [
            "Queer Youth Group (QYG), in collaboration with Queer Rights Collective (QRC), successfully hosted the seventh Nepal Pride Parade (NPP) at Narayan Chaur, Naxal, Kathmandu.",
            "This year's Pride marked a significant milestone as it was the first time QYG independently led the overall coordination and execution of the program."
          ],
          slug: "nepal-pride-2025"
        }
      };

      const events = locale === 'ne' ? nepaliEvents : englishEvents;
      return events[year] || { title: '', date: '', details: [], slug: '' };
    }
  };

  const translations = getTranslations();

  const events: TimelineEventData[] = [
    {
      year: "2019",
      ...getEventData('2019'),
      hasEvent: true
    },
    {
      year: "2020",
      ...getEventData('2020'),
      hasEvent: true
    },
    {
      year: "2021",
      hasEvent: false
    },
    {
      year: "2022",
      hasEvent: false
    },
    {
      year: "2023",
      hasEvent: false
    },
    {
      year: "2024",
      hasEvent: false
    },
    {
      year: "2025",
      ...getEventData('2025'),
      hasEvent: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header Section */}
        <div className="text-center mb-12 pt-8">
          <h1 className="text-4xl md:text-5xl font-bold text-pink-800 mb-4">
            {translations.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {translations.subtitle}
          </p>
        </div>
        
        {/* Timeline Section */}
        <div className="relative pb-8">
          {/* Vertical timeline line */}
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full"
            style={{ backgroundColor: '#d41367' }}
          ></div>
          
          {events.map((event: TimelineEventData, index: number) => {
            // Custom positioning logic
            let isLeft: boolean;
            if (event.year === "2022" || event.year === "2024") {
              isLeft = false; // Right side
            } else if (event.year === "2021" || event.year === "2023") {
              isLeft = true; // Left side
            } else {
              isLeft = index % 2 === 0; // Default alternating pattern for other years
            }

            return (
              <TimelineEvent
                key={event.year}
                year={event.year}
                title={event.title}
                date={event.date}
                details={event.details}
                slug={event.slug}
                isLeft={isLeft}
                hasEvent={event.hasEvent}
              />
            );
          })}
        </div>

        {/* Footer Section */}
        <div className="text-center mt-12 pt-8 border-t border-pink-200">
          <p className="text-gray-500 text-sm">
            {translations.footerText}
          </p>
        </div>
      </div>
    </div>
  );
};

// Page Component with locale support
export default function TimelinePage() {  
  return (
    <main>
      <NepalPrideTimeline />
    </main>
  );
}