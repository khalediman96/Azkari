'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { use } from 'react';
import { Repeat, Sparkles, CheckCircle } from 'lucide-react';
import contentMap from '@/app/[slug]/data';

interface CardPageProps {
  params: Promise<{ slug: keyof typeof contentMap }>;
}

export default function CardPage({ params }: CardPageProps) {
  const { slug } = use(params);

  const pageData = contentMap[slug];

  if (!pageData) {
    notFound();
  }

  const { title, description, content } = pageData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 dark:from-slate-900 dark:via-purple-900/20 dark:to-indigo-900/20">
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-indigo-600/30" />
            
            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
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
      <div className="w-[95%] mx-auto px-4 pb-12">
        {/* Decorative divider */}
        <div className="flex items-center justify-center mb-12">
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></div>
          <Sparkles className="mx-4 text-purple-500" size={24} />
          <div className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {content.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 dark:border-slate-700/50"
            >
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative flex flex-col lg:flex-row p-6 gap-6">
                {/* Content Section */}
                <div className="flex-1 space-y-4">
                  {/* Main text */}
                  <div className="relative">
                    <p className="text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400 leading-relaxed">
                      {item.main}
                    </p>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                  </div>
                  
                  {/* Secondary text */}
                  <div className="bg-gradient-to-r from-slate-100 to-purple-50 dark:from-slate-700 dark:to-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
                    <p className="text-lg md:text-xl leading-relaxed text-slate-700 dark:text-slate-200">
                      {item.secondary}
                    </p>
                  </div>
                  
                  {/* Reward text */}
                  <div className="flex items-start gap-3 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800">
                    <CheckCircle className="text-emerald-500 mt-1 flex-shrink-0" size={20} />
                    <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed">
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
                ? 'text-emerald-500' 
                : 'text-purple-500'
            }`}
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
          />
        </svg>
      </div>

      <div
        className={`relative border-2 transition-all duration-300 cursor-pointer ${
          isVisited && count === 0 
            ? 'bg-gradient-to-br from-emerald-500 to-teal-600 border-emerald-400 shadow-lg shadow-emerald-500/25' 
            : 'bg-gradient-to-br from-purple-600 to-indigo-700 border-purple-500 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40'
        } rounded-2xl overflow-hidden transform hover:scale-105 active:scale-95`}
        onClick={decrementCount}
      >
        {/* Original repetitions indicator */}
        <div className="absolute top-3 right-3 text-white/60 text-sm font-medium bg-white/10 rounded-full px-2 py-1 backdrop-blur-sm">
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
            className="group/btn bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110"
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