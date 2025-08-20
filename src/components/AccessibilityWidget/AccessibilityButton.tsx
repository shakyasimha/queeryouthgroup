"use client";

import React from 'react'
import { Accessibility } from 'lucide-react';

export const AccessibilityButton = () => {
  return (
    <>
        {/* Floating Button - Fixed and Sticky */}
        <div className="fixed bottom-[6rem] right-[6rem] z-[9999]">
        <button
            //onClick={toggleWidget}
            className="
            relative w-16 h-16 rounded-full shadow-2xl transition-all duration-300 hover:scale-110
            bg-[#d41367] hover:bg-[#b8115a] shadow-[#d41367]/30
            text-white flex items-center justify-center border-2 border-white"
            // aria-label={t.open}
            style={{ position: 'fixed' }}
        >
            <Accessibility size={26} />
            {/* {state.hasAccessibilityEnabled && (
            <div className="absolute -top-2 -right-2 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                <Check size={16} className="text-white font-bold" />
            </div>
            )} */}
        </button>
        </div>
    </>
  )
}
