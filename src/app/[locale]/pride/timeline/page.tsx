// app/[locale]/pride/timeline/page.tsx
import React from 'react';
import { Metadata } from 'next';

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
  const events: TimelineEventData[] = [
    {
      year: "2019",
      title: "Nepal Pride Parade 2019: Inaugural Milestone",
      date: "June 29, 2019",
      details: [
        "Queer Youth Group (QYG) organized the first-ever Nepal Pride Parade in collaboration with Queer Rights Collective (QRC) and Campaign for Change (CFC).",
        "This historic event marked the beginning of organized Pride celebrations in Nepal."
      ],
      hasEvent: true
    },
    {
      year: "2020",
      title: "Online Pride Parade",
      date: "June 13, 2020",
      details: [
        "Held virtually due to the COVID-19 pandemic",
        "Would have been the second annual Nepal Pride Parade",
        "Took place across various online platforms throughout the day"
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
      title: "Seventh Nepal Pride Parade",
      date: "June 14, 2025",
      details: [
        "Queer Youth Group (QYG), in collaboration with Queer Rights Collective (QRC), successfully hosted the seventh Nepal Pride Parade (NPP) at Narayan Chaur, Naxal, Kathmandu.",
        "This year's Pride marked a significant milestone as it was the first time QYG independently led the overall coordination and execution of the program, with QRC offering strategic support."
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
            Nepal Pride Parade Timeline
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A journey through the milestones of LGBTQ+ pride celebrations in Nepal, 
            showcasing the evolution of community organizing and visibility.
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
            Celebrating diversity, equality, and the ongoing fight for LGBTQ+ rights in Nepal
          </p>
        </div>
      </div>
    </div>
  );
};

// Metadata for the page
export const metadata: Metadata = {
  title: 'Nepal Pride Parade Timeline | LGBTQ+ History',
  description: 'Explore the history and milestones of Nepal Pride Parade from 2019 to 2025, showcasing the journey of LGBTQ+ rights and community organizing in Nepal.',
  keywords: 'Nepal Pride, LGBTQ+, Pride Parade, Queer Youth Group, Nepal LGBTQ+ history',
  openGraph: {
    title: 'Nepal Pride Parade Timeline',
    description: 'A comprehensive timeline of Nepal Pride Parade events from 2019-2025',
    type: 'website',
  },
};

// Page Component with locale support
export default function TimelinePage() {
  return (
    <main>
      <NepalPrideTimeline />
    </main>
  );
}