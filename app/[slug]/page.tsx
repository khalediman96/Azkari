'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { use } from 'react';
import { Repeat, Sparkles, CheckCircle, Plus, Minus } from 'lucide-react';
import contentMap from '@/app/[slug]/data';

interface CardPageProps {
  params: Promise<{ slug: keyof typeof contentMap }>;
}

export default function CardPage({ params }: CardPageProps) {
  const { slug } = use(params);
  const [fontSize, setFontSize] = useState('normal'); // 'small', 'normal', 'large'

  const pageData = contentMap[slug];

  if (!pageData) {
    notFound();
  }

  const { title, description, content } = pageData;

  const increaseFontSize = () => {
    setFontSize(prev => {
      if (prev === 'small') return 'normal';
      if (prev === 'normal') return 'large';
      return 'large';
    });
  };

  const decreaseFontSize = () => {
    setFontSize(prev => {
      if (prev === 'large') return 'normal';
      if (prev === 'normal') return 'small';
      return 'small';
    });
  };

  const resetFontSize = () => {
    setFontSize('normal');
  };

  const getFontSizeClasses = () => {
    switch (fontSize) {
      case 'small':
        return {
          main: 'text-xl md:text-2xl',
          secondary: 'text-base md:text-lg',
          reward: 'text-sm md:text-base'
        };
      case 'large':
        return {
          main: 'text-3xl md:text-4xl',
          secondary: 'text-xl md:text-2xl',
          reward: 'text-lg md:text-xl'
        };
      default: // normal
        return {
          main: 'text-2xl md:text-3xl',
          secondary: 'text-lg md:text-xl',
          reward: 'text-base md:text-lg'
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f3e9] via-[#eef7f0] to-[#e8f4ec] dark:from-[#061f13] dark:via-[#0a2618] dark:to-[#0f3422]">
      {/* Hero Section */}
      <div className="relative pt-24 pb-12">
        <div className="w-[95%] mx-auto px-4">
          <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/inner.jpg"
              alt="Inner Banner"
              fill
              style={{ objectFit: 'cover' }}
              className='rounded-3xl'
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a5c34]/50 to-[#083d24]/40" />
            <div className="absolute inset-0 islamic-bg-pattern opacity-20" />
            
            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8">
              <div className="bg-[#0a5c34]/30 backdrop-blur-md rounded-2xl p-6 border border-[#efb63c]/25">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                  {title}
                </h1>
                <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-[95%] mx-auto px-4 pb-12 relative">
        {/* Font size control buttons */}
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-2">
          <button
            onClick={increaseFontSize}
            className="bg-[#177c52] hover:bg-[#0e5236] text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
            title="Increase font size"
          >
            <Plus size={16} />
            <span className="text-xs ml-1">A</span>
          </button>
          <button
            onClick={resetFontSize}
            className="bg-[#0a5c34] hover:bg-[#08431d] text-[#efb63c] rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 border border-[#efb63c]/30"
            title="Reset font size"
          >
            <span className="text-sm font-bold">A</span>
          </button>
          <button
            onClick={decreaseFontSize}
            className="bg-[#0a4828] hover:bg-[#083520] text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
            title="Decrease font size"
          >
            <Minus size={16} />
            <span className="text-xs ml-1">A</span>
          </button>
        </div>
        {/* Decorative divider */}
        <div className="flex items-center justify-center mb-12">
          <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-[#c27c18] to-transparent rounded-full opacity-80"></div>
          <Sparkles className="mx-4 text-[#c27c18]" size={24} />
          <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-[#c27c18] to-transparent rounded-full opacity-80"></div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {content.map((item, index) => (
            <div
              key={index}
              className="group relative bg-[#f7f3e9]/55 dark:bg-[#0f3422]/55 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-[#c27c18]/25 dark:border-[#177c52]/45"
            >
              <div className="absolute inset-0 bg-white/20 dark:bg-white/5 backdrop-blur-xl" />
              {/* Card ID number */}
              <div className="absolute top-4 right-4 z-10 bg-gradient-to-br from-[#177c52] to-[#0a4828] text-[#efb63c] rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-md border border-[#efb63c]/30">
                {index + 1}
              </div>
              
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a5c34]/15 to-[#c27c18]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative flex flex-col lg:flex-row p-6 gap-6">
                {/* Content Section */}
                <div className="flex-1 space-y-4">
                  {/* Main text */}
                  <div className="relative">
                    <p className={`${getFontSizeClasses().main} font-bold text-[#0a5c34] dark:text-[#47b484] leading-relaxed`}>
                      {item.main}
                    </p>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-[#177c52] to-[#c27c18] rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                  </div>
                  
                  {/* Secondary text */}
                  <div className="bg-gradient-to-r from-[#eef7f0] to-[#f4f1e8] dark:from-[#0c3320] dark:to-[#0f2e1c] rounded-xl p-4 border border-[#b0d4bc] dark:border-[#1e5c3a]">
                    <p className={`${getFontSizeClasses().secondary} leading-relaxed text-slate-700 dark:text-slate-200`}>
                      {item.secondary}
                    </p>
                  </div>
                  
                  {/* Reward text */}
                  <div className="flex items-start gap-3 bg-gradient-to-r from-[#fdf8e8] to-[#f9f0d5] dark:from-[#1a3a10]/40 dark:to-[#2a4a18]/40 rounded-xl p-4 border border-[#c9a22a]/40 dark:border-[#c27c18]/30">
                    <CheckCircle className="text-[#177c52] dark:text-[#47b484] mt-1 flex-shrink-0" size={20} />
                    <p className={`${getFontSizeClasses().reward} text-[#6b5010] dark:text-[#d4a843] leading-relaxed`}>
                      {item.reward}
                    </p>
                  </div>
                </div>
                
                {/* Counter Section */}
                <div className="flex-shrink-0">
                  <Card repetitions={item.repetitions} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Card({ repetitions }: { repetitions: number }) {
  const [count, setCount] = useState(repetitions);
  const [isVisited, setIsVisited] = useState(false);

  const decrementCount = () => {
  setCount((prev) => {
    if (prev <= 0) {
      // If already at 0, reset to original value
      setIsVisited(false);
      return repetitions;
    }
    
    const newCount = prev - 1;
    if (newCount === 0) {
      setIsVisited(true);
    }
    return newCount;
  });
};

  const resetCount = () => {
    setCount(repetitions);
    setIsVisited(false);
  };

  const progress = ((repetitions - count) / repetitions) * 100;

  return (
    <div className="relative">
      {/* Progress ring */}
      <div className="absolute inset-0 rounded-2xl">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-200 dark:text-gray-700"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
            className={`transition-all duration-300 ${
              isVisited && count === 0 
                ? 'text-[#c27c18]' 
                : 'text-[#177c52]'
            }`}
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
          />
        </svg>
      </div>

      <div
        className={`relative border-2 transition-all duration-300 cursor-pointer ${
          isVisited && count === 0 
            ? 'bg-gradient-to-br from-[#c27c18]/85 to-[#8a530d]/85 border-[#efb63c]/70 shadow-lg shadow-[#c27c18]/25' 
            : 'bg-gradient-to-br from-[#177c52]/85 to-[#0a4828]/85 border-[#47b484]/60 shadow-lg shadow-[#177c52]/25 hover:shadow-xl hover:shadow-[#177c52]/40'
        } rounded-2xl overflow-hidden transform hover:scale-105 active:scale-95 backdrop-blur-xl`}
        onClick={decrementCount}
      >
        <div className="absolute inset-0 bg-white/10 backdrop-blur-lg" />
        {/* Original repetitions indicator */}
        <div className="absolute top-3 right-3 text-white/80 text-xs font-semibold bg-black/20 rounded-full px-2.5 py-1 backdrop-blur-sm border border-white/20">
          {repetitions}
        </div>

        {/* Main content */}
        <div className="p-6 text-center">
          {/* Counter display */}
          <div className="relative mb-6">
            <div className={`digital7 text-white text-5xl font-bold mb-2 ${
              isVisited && count === 0 ? 'animate-pulse' : ''
            }`}>
              {count.toString().padStart(2, '0')}
            </div>
            
            {/* Status indicator */}
            {isVisited && count === 0 && (
              <div className="flex items-center justify-center gap-2 text-white/90 text-sm">
                <CheckCircle size={16} />
                <span>مكتمل</span>
              </div>
            )}
          </div>

          {/* Reset button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              resetCount();
            }}
            className="group/btn bg-white/15 hover:bg-[#efb63c]/35 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110 border border-white/20"
          >
            <Repeat 
              size={20} 
              color="#fff" 
              className="group-hover/btn:rotate-180 transition-transform duration-300"
            />
          </button>
        </div>

        {/* Completion celebration effect */}
        {isVisited && count === 0 && (
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 animate-pulse" />
        )}
      </div>
    </div>
  );
}