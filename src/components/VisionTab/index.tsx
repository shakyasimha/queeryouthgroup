"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { alegreyaSans } from '@/ui/fonts';

export default function VisionTab() {
  const [activeTab, setActiveTab] = useState<'vision' | 'mission' | 'goal'>('vision');
  const t = useTranslations('VisionTab.tabContent');

  return (
    <div className="w-full max-w-3xl mx-auto mb-12"> {/* Added mb-12 for bottom spacing */}
      <div className={`${alegreyaSans.className} flex flex-col lg:flex-row min-h-[300px] bg-white rounded-xl shadow-lg overflow-hidden`}>
        {/* Tabs on left */}
        <div className="flex lg:flex-col border-b lg:border-b-0 lg:border-r border-gray-200 bg-white text-[#d41367]">
          {(['vision', 'mission', 'goal'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-left font-bold transition-colors duration-200
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
        <div className="flex-1 p-6 bg-[#F5EFE0]">
          <div className="h-full flex flex-col justify-center">
            <p className="text-gray-700 font-bold">
              {t(`${activeTab}.content`)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}