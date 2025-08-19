"use client";

import React from 'react';
import { useAccessibility } from './AccessibilityProvider';
import { 
  Accessibility, 
  Eye, 
  EyeOff, 
  Type, 
  Pause, 
  Play, 
  Image as ImageIcon, 
  ImageOff,
  MousePointer,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Palette,
  HelpCircle,
  RotateCcw,
  Check,
  X,
  Settings
} from 'lucide-react';

interface AccessibilityWidgetProps {
  lang?: "en" | "ne";
}

export default function AccessibilityWidget({ lang = "en" }: AccessibilityWidgetProps) {
  const { state, dispatch } = useAccessibility();

  const translations = {
    en: {
      accessibility: "Accessibility",
      active: "Active",
      reset: "Reset",
      close: "Close accessibility options",
      open: "Open accessibility options",
      resetAll: "Reset all accessibility settings",
      
      // Sections
      contrast: "Contrast",
      textSize: "Text Size",
      textSpacing: "Text Spacing",
      lineHeight: "Line Height",
      textAlign: "Text Align",
      fontType: "Font Type",
      cursor: "Cursor",
      saturation: "Saturation",
      options: "Options",
      
      // Contrast options
      normal: "Normal",
      invert: "Invert",
      dark: "Dark",
      light: "Light",
      
      // Text spacing options
      moderate: "Moderate",
      heavy: "Heavy",
      
      // Font type options
      dyslexiaFriendly: "Dyslexia Friendly",
      legible: "Legible",
      
      // Cursor options
      big: "Big",
      readingGuide: "Reading Guide",
      readingMask: "Reading Mask",
      
      // Saturation options
      low: "Low",
      desaturate: "Desaturate",
      
      // Toggle options
      highlightLinks: "Highlight Links",
      pauseAnimations: "Pause Animations",
      hideImages: "Hide Images",
      showTooltips: "Show Tooltips"
    },
    ne: {
      accessibility: "पहुँच सुविधा",
      active: "सक्रिय",
      reset: "रिसेट",
      close: "पहुँच विकल्पहरू बन्द गर्नुहोस्",
      open: "पहुँच विकल्पहरू खोल्नुहोस्",
      resetAll: "सबै पहुँच सेटिङहरू रिसेट गर्नुहोस्",
      
      // Sections
      contrast: "कन्ट्रास्ट",
      textSize: "पाठ साइज",
      textSpacing: "पाठ स्पेसिङ",
      lineHeight: "लाइन उचाइ",
      textAlign: "पाठ पङ्क्तिबद्धता",
      fontType: "फन्ट प्रकार",
      cursor: "कर्सर",
      saturation: "संतृप्तता",
      options: "विकल्पहरू",
      
      // Contrast options
      normal: "सामान्य",
      invert: "उल्टो",
      dark: "अँध्यारो",
      light: "उज्यालो",
      
      // Text spacing options
      moderate: "मध्यम",
      heavy: "भारी",
      
      // Font type options
      dyslexiaFriendly: "डिस्लेक्सिया मैत्री",
      legible: "पढ्न सकिने",
      
      // Cursor options
      big: "ठूलो",
      readingGuide: "पठन गाइड",
      readingMask: "पठन मास्क",
      
      // Saturation options
      low: "कम",
      desaturate: "रंगहीन",
      
      // Toggle options
      highlightLinks: "लिङ्कहरू हाइलाइट गर्नुहोस्",
      pauseAnimations: "एनिमेसनहरू रोक्नुहोस्",
      hideImages: "तस्बिरहरू लुकाउनुहोस्",
      showTooltips: "टुलटिपहरू देखाउनुहोस्"
    }
  };

  const t = translations[lang];

  const toggleWidget = () => {
    dispatch({ type: 'TOGGLE_WIDGET' });
  };

  const resetAll = () => {
    dispatch({ type: 'RESET_ALL' });
  };

  const getContrastLabel = (option: string) => {
    switch(option) {
      case 'normal': return t.normal;
      case 'invert': return t.invert;
      case 'dark': return t.dark;
      case 'light': return t.light;
      default: return option;
    }
  };

  const getTextSpacingLabel = (spacing: string) => {
    switch(spacing) {
      case 'normal': return t.normal;
      case 'light': return t.light;
      case 'moderate': return t.moderate;
      case 'heavy': return t.heavy;
      default: return spacing;
    }
  };

  const getFontTypeLabel = (font: string) => {
    switch(font) {
      case 'normal': return t.normal;
      case 'dyslexia': return t.dyslexiaFriendly;
      case 'legible': return t.legible;
      default: return font;
    }
  };

  const getCursorLabel = (cursor: string) => {
    switch(cursor) {
      case 'normal': return t.normal;
      case 'big': return t.big;
      case 'reading-guide': return t.readingGuide;
      case 'reading-mask': return t.readingMask;
      default: return cursor.replace('-', ' ');
    }
  };

  const getSaturationLabel = (saturation: string) => {
    switch(saturation) {
      case 'normal': return t.normal;
      case 'low': return t.low;
      case 'heavy': return t.heavy;
      case 'desaturate': return t.desaturate;
      default: return saturation;
    }
  };

  return (
    <>
      {/* Floating Button - Fixed and Sticky */}
      <div className="fixed bottom-6 right-6 z-[9999]">
        <button
          onClick={toggleWidget}
          className={`
            relative w-16 h-16 rounded-full shadow-2xl transition-all duration-300 hover:scale-110
            ${state.hasAccessibilityEnabled 
              ? 'bg-[#d41367] hover:bg-[#b8115a] shadow-[#d41367]/30' 
              : 'bg-[#d41367] hover:bg-[#b8115a] shadow-[#d41367]/30'
            }
            text-white flex items-center justify-center border-2 border-white
          `}
          aria-label={t.open}
          style={{ position: 'fixed' }}
        >
          <Accessibility size={26} />
          {state.hasAccessibilityEnabled && (
            <div className="absolute -top-2 -right-2 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
              <Check size={16} className="text-white font-bold" />
            </div>
          )}
        </button>
      </div>

      {/* Backdrop Overlay */}
      {state.isWidgetOpen && (
        <div 
          className="fixed inset-0 z-[9998] bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"
          onClick={toggleWidget}
        />
      )}

      {/* Slide-in Panel from Right */}
      <div className={`
        fixed top-0 right-0 h-full z-[9999] bg-white shadow-2xl transition-transform duration-300 ease-in-out
        ${state.isWidgetOpen ? 'translate-x-0' : 'translate-x-full'}
        w-full sm:w-96 md:w-[28rem] lg:w-[32rem]
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-[#d41367] to-[#b8115a] text-white">
          <div className="flex items-center gap-3">
            <Accessibility className="text-white" size={24} />
            <h2 className="text-lg font-bold">{t.accessibility}</h2>
            {state.hasAccessibilityEnabled && (
              <div className="flex items-center gap-1 px-2 py-1 bg-white bg-opacity-20 text-white rounded-full text-xs backdrop-blur-sm">
                <Check size={12} />
                <span>{t.active}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={resetAll}
              className="flex items-center gap-1 px-3 py-1 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-all duration-200 backdrop-blur-sm text-sm"
              aria-label={t.resetAll}
            >
              <RotateCcw size={14} />
              <span>{t.reset}</span>
            </button>
            <button
              onClick={toggleWidget}
              className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-all duration-200"
              aria-label={t.close}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="h-full overflow-y-auto pb-20">
          <div className="p-4 space-y-6">
            
            {/* Contrast */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Eye size={18} />
                {t.contrast}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {(['normal', 'invert', 'dark', 'light'] as const).map((option) => (
                  <button
                    key={option}
                    onClick={() => dispatch({ type: 'SET_CONTRAST', payload: option })}
                    className={`
                      p-2 text-sm rounded-lg border transition-colors
                      ${state.contrast === option 
                        ? 'bg-[#d41367] text-white border-[#d41367]' 
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-[#d41367]'
                      }
                    `}
                  >
                    {getContrastLabel(option)}
                  </button>
                ))}
              </div>
            </div>

            {/* Text Size */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Type size={18} />
                {t.textSize}
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {([1, 2, 3, 4] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => dispatch({ type: 'SET_TEXT_SIZE', payload: size })}
                    className={`
                      p-2 text-sm rounded-lg border transition-colors
                      ${state.textSize === size 
                        ? 'bg-[#d41367] text-white border-[#d41367]' 
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-[#d41367]'
                      }
                    `}
                  >
                    {size}x
                  </button>
                ))}
              </div>
            </div>

            {/* Text Spacing */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Type size={18} />
                {t.textSpacing}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {(['normal', 'light', 'moderate', 'heavy'] as const).map((spacing) => (
                  <button
                    key={spacing}
                    onClick={() => dispatch({ type: 'SET_TEXT_SPACING', payload: spacing })}
                    className={`
                      p-2 text-sm rounded-lg border transition-colors
                      ${state.textSpacing === spacing 
                        ? 'bg-[#d41367] text-white border-[#d41367]' 
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-[#d41367]'
                      }
                    `}
                  >
                    {getTextSpacingLabel(spacing)}
                  </button>
                ))}
              </div>
            </div>

            {/* Line Height */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <AlignLeft size={18} />
                {t.lineHeight}
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {([1, 1.5, 1.75, 2] as const).map((height) => (
                  <button
                    key={height}
                    onClick={() => dispatch({ type: 'SET_LINE_HEIGHT', payload: height })}
                    className={`
                      p-2 text-sm rounded-lg border transition-colors
                      ${state.lineHeight === height 
                        ? 'bg-[#d41367] text-white border-[#d41367]' 
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-[#d41367]'
                      }
                    `}
                  >
                    {height}x
                  </button>
                ))}
              </div>
            </div>

            {/* Text Alignment */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <AlignLeft size={18} />
                {t.textAlign}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'left' as const, icon: AlignLeft },
                  { value: 'center' as const, icon: AlignCenter },
                  { value: 'right' as const, icon: AlignRight },
                  { value: 'justified' as const, icon: AlignJustify }
                ].map(({ value, icon: Icon }) => (
                  <button
                    key={value}
                    onClick={() => dispatch({ type: 'SET_TEXT_ALIGN', payload: value })}
                    className={`
                      p-2 text-sm rounded-lg border transition-colors flex items-center justify-center
                      ${state.textAlign === value 
                        ? 'bg-[#d41367] text-white border-[#d41367]' 
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-[#d41367]'
                      }
                    `}
                  >
                    <Icon size={16} />
                  </button>
                ))}
              </div>
            </div>

            {/* Font Type */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Type size={18} />
                {t.fontType}
              </h3>
              <div className="space-y-2">
                {(['normal', 'dyslexia', 'legible'] as const).map((font) => (
                  <button
                    key={font}
                    onClick={() => dispatch({ type: 'SET_FONT_TYPE', payload: font })}
                    className={`
                      w-full p-2 text-sm rounded-lg border transition-colors text-left
                      ${state.fontType === font 
                        ? 'bg-[#d41367] text-white border-[#d41367]' 
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-[#d41367]'
                      }
                    `}
                  >
                    {getFontTypeLabel(font)}
                  </button>
                ))}
              </div>
            </div>

            {/* Cursor */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <MousePointer size={18} />
                {t.cursor}
              </h3>
              <div className="space-y-2">
                {(['normal', 'big', 'reading-guide', 'reading-mask'] as const).map((cursor) => (
                  <button
                    key={cursor}
                    onClick={() => dispatch({ type: 'SET_CURSOR', payload: cursor })}
                    className={`
                      w-full p-2 text-sm rounded-lg border transition-colors text-left
                      ${state.cursor === cursor 
                        ? 'bg-[#d41367] text-white border-[#d41367]' 
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-[#d41367]'
                      }
                    `}
                  >
                    {getCursorLabel(cursor)}
                  </button>
                ))}
              </div>
            </div>

            {/* Saturation */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Palette size={18} />
                {t.saturation}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {(['normal', 'low', 'heavy', 'desaturate'] as const).map((saturation) => (
                  <button
                    key={saturation}
                    onClick={() => dispatch({ type: 'SET_SATURATION', payload: saturation })}
                    className={`
                      p-2 text-sm rounded-lg border transition-colors
                      ${state.saturation === saturation 
                        ? 'bg-[#d41367] text-white border-[#d41367]' 
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-[#d41367]'
                      }
                    `}
                  >
                    {getSaturationLabel(saturation)}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggle Options */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Settings size={18} />
                {t.options}
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => dispatch({ type: 'TOGGLE_HIGHLIGHT_LINKS' })}
                  className={`
                    w-full p-3 rounded-lg border transition-colors flex items-center justify-between
                    ${state.highlightLinks 
                      ? 'bg-[#d41367] text-white border-[#d41367]' 
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-[#d41367]'
                    }
                  `}
                >
                  <span>{t.highlightLinks}</span>
                  {state.highlightLinks && <Check size={16} />}
                </button>
                
                <button
                  onClick={() => dispatch({ type: 'TOGGLE_PAUSE_ANIMATIONS' })}
                  className={`
                    w-full p-3 rounded-lg border transition-colors flex items-center justify-between
                    ${state.pauseAnimations 
                      ? 'bg-[#d41367] text-white border-[#d41367]' 
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-[#d41367]'
                    }
                  `}
                >
                  <span>{t.pauseAnimations}</span>
                  {state.pauseAnimations ? <Pause size={16} /> : <Play size={16} />}
                </button>
                
                <button
                  onClick={() => dispatch({ type: 'TOGGLE_HIDE_IMAGES' })}
                  className={`
                    w-full p-3 rounded-lg border transition-colors flex items-center justify-between
                    ${state.hideImages 
                      ? 'bg-[#d41367] text-white border-[#d41367]' 
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-[#d41367]'
                    }
                  `}
                >
                  <span>{t.hideImages}</span>
                  {state.hideImages ? <ImageOff size={16} /> : <ImageIcon size={16} />}
                </button>
                
                <button
                  onClick={() => dispatch({ type: 'TOGGLE_TOOLTIPS' })}
                  className={`
                    w-full p-3 rounded-lg border transition-colors flex items-center justify-between
                    ${state.tooltips 
                      ? 'bg-[#d41367] text-white border-[#d41367]' 
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-[#d41367]'
                    }
                  `}
                >
                  <span>{t.showTooltips}</span>
                  {state.tooltips && <HelpCircle size={16} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}