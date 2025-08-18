// app/[locale]/pride/timeline/page.tsx
import React from 'react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';

// Type definitions
interface TimelineEventData {
  year: string;
  title?: string;
  date?: string;
  details?: string[];
  hasEvent: boolean;
}

interface TimelineEventProps {
  year: string;
  title?: string;
  date?: string;
  details?: string[];
  isLeft: boolean;
  hasEvent: boolean;
}

interface PageParams {
  locale: string;
}

interface TimelinePageProps {
  params: Promise<PageParams>;
}

// Timeline Event Component
const TimelineEvent: React.FC<TimelineEventProps> = ({ 
  year, 
  title, 
  date, 
  details, 
  isLeft, 
  hasEvent 
}) => {
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
    <div className={`flex items-center mb-8 relative ${isLeft ? 'flex-row-reverse' : ''}`}>
      <div className="flex-1 px-6">
        <div className={`bg-pink-50 p-6 rounded-lg shadow-md border-l-4 border-pink-600 hover:shadow-lg transition-shadow duration-300 ${isLeft ? 'text-right border-r-4 border-l-0' : ''}`}>
          {title && (
            <h3 className="text-xl font-bold text-pink-800 mb-2">{title}</h3>
          )}
          {date && (
            <p className="text-pink-700 font-semibold mb-3">{date}</p>
          )}
          {details && details.length > 0 && (
            <div className="text-gray-700 space-y-2">
              {details.map((detail: string, index: number) => (
                <p key={index} className="text-sm leading-relaxed">{detail}</p>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="w-4 h-4 bg-pink-600 rounded-full border-4 border-white z-10 relative shadow-md"></div>
      
      <div className="flex-1"></div>
    </div>
  );
};

// Main Timeline Component
const NepalPrideTimeline: React.FC = () => {
  const t = useTranslations('prideTimelinePage');

  const events: TimelineEventData[] = [
    {
      year: "2019",
      title: t('events.2019.title'),
      date: t('events.2019.date'),
      details: [
        t('events.2019.details.0'),
        t('events.2019.details.1')
      ],
      hasEvent: true
    },
    {
      year: "2020",
      title: t('events.2020.title'),
      date: t('events.2020.date'),
      details: [
        t('events.2020.details.0'),
        t('events.2020.details.1'),
        t('events.2020.details.2')
      ],
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
      title: t('events.2025.title'),
      date: t('events.2025.date'),
      details: [
        t('events.2025.details.0'),
        t('events.2025.details.1')
      ],
      hasEvent: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header Section */}
        <div className="text-center mb-12 pt-8">
          <h1 className="text-4xl md:text-5xl font-bold text-pink-800 mb-4">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
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
            if (event.year === "2021" || event.year === "2023") {
              isLeft = false; // Right side
            } else if (event.year === "2022" || event.year === "2024") {
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
                isLeft={isLeft}
                hasEvent={event.hasEvent}
              />
            );
          })}
        </div>

        {/* Footer Section */}
        <div className="text-center mt-12 pt-8 border-t border-pink-200">
          <p className="text-gray-500 text-sm">
            {t('footerText')}
          </p>
        </div>
      </div>
    </div>
  );
};

// Generate metadata with translations
export async function generateMetadata({ params }: TimelinePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'prideTimelinePage' });
  
  return {
    title: t('title'),
    description: t('subtitle'),
    keywords: 'Nepal Pride, LGBTQ+, Pride Parade, Queer Youth Group, Nepal LGBTQ+ history',
    openGraph: {
      title: t('title'),
      description: t('subtitle'),
      type: 'website',
    },
  };
}

// Page Component with locale support
export default async function TimelinePage({ params }: TimelinePageProps) {
  const { locale } = await params;
  
  return (
    <main>
      <NepalPrideTimeline />
    </main>
  );
}