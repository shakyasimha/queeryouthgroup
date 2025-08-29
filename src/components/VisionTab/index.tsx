"use client";

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { alegreyaSans, notoSansDevanagari } from '@/ui/fonts';

type GoalItem = {
  title: string;
  content: string;
};

export default function VisionTab() {
  const [activeTab, setActiveTab] = useState<'vision' | 'mission' | 'goal'>('vision');
  const t = useTranslations('VisionTab.tabContent');
  const currentLocale = useLocale();

  // Changing font per locale
  const font = currentLocale == 'en' ? alegreyaSans.className : notoSansDevanagari.className; 

  // Get goals with proper type casting
  const goals = t.raw('goal.items') as GoalItem[];

  return (
    <div className="w-full max-w-6xl mx-auto mb-16 px-4">
      <div className={`${font} flex flex-col lg:flex-row bg-white rounded-xl shadow-lg overflow-hidden`}>
        {/* Tabs on left */}
        <div className="flex lg:flex-col border-b lg:border-b-0 lg:border-r border-gray-200 bg-white text-[#d41367] lg:min-w-[200px]">
          {(['vision', 'mission', 'goal'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-left text-base lg:text-lg font-bold transition-colors duration-200 flex-1 lg:flex-none
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
        <div className={`flex-1 px-6 lg:px-8 py-6 bg-[#F5EFE0] ${
          activeTab === 'goal' 
            ? 'min-h-[500px] lg:min-h-[600px]' 
            : 'min-h-[300px] lg:min-h-[400px]'
        }`}>
          {activeTab !== 'goal' ? (
            <div className="h-full flex flex-col justify-center">
              <p className="text-gray-700 text-base lg:text-lg leading-relaxed">
                {t(`${activeTab}.content`)}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <h3 className="text-lg lg:text-xl font-bold text-[#d41367] mb-6">
                {t('goal.title')}
              </h3>
              <div className="grid gap-6 lg:gap-8">
                {goals.map((item, index) => (
                  <div key={index} className="bg-white/50 rounded-lg p-4 lg:p-5 border border-white/70 shadow-sm">
                    <h4 className="font-bold text-gray-800 mb-3 text-base lg:text-lg leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-gray-700 text-sm lg:text-base leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}