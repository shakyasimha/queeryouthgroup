"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { alegreyaSans } from '@/ui/fonts';

export default function VisionTab() {
  const [activeTab, setActiveTab] = useState<'vision' | 'mission' | 'goal'>('vision');
  const t = useTranslations('VisionTab.tabContent');

  return (
    <div className="w-full max-w-5xl mx-auto mb-16 px-4"> {/* Wider max width and padding */}
      <div className={`${alegreyaSans.className} flex flex-col lg:flex-row min-h-[300px] bg-white rounded-xl shadow-lg overflow-hidden`}>
        {/* Tabs on left */}
        <div className="flex lg:flex-col border-b lg:border-b-0 lg:border-r border-gray-200 bg-white text-[#d41367]">
          {(['vision', 'mission', 'goal'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-left text-base lg:text-lg font-bold transition-colors duration-200
                ${activeTab === tab 
                  ? 'bg-[#f5efe0] text-[#d41367]' 
                  : 'hover:bg-[#f5efe0] hover:text-black'
                }`}
            >
              {t(`${tab}.title`)}
            </button>
          ))}
        </div>

        {/* Content on right */}
        <div className="flex-1 px-8 py-6 bg-[#F5EFE0]"> {/* Increased padding */}
          <div className="h-full flex flex-col justify-center">
            <p className="text-gray-700 text-base lg:text-lg font-bold leading-relaxed">
              {t(`${activeTab}.content`)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
