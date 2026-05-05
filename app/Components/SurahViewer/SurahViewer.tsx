'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronDownIcon, BookOpenIcon, LanguageIcon, PlayIcon, PauseIcon } from '@heroicons/react/24/outline';
import Select from 'react-select';
import Image from 'next/image';

// Import Google Fonts for better Arabic support
const googleFontsLink = `
@import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Scheherazade+New:wght@400;500;600;700&family=Noto+Sans+Arabic:wght@100;200;300;400;500;600;700;800;900&display=swap');
`;

interface Verse {
  number: number;
  text: string;
  bismillah?: string;
}

interface Surah {
  number: number;
  name: string;
  verses: Verse[];
  translation?: Verse[];
}

interface SurahInfo {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export default function SurahViewer() {
  const [surahs, setSurahs] = useState<SurahInfo[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<number>(1);
  const [surahData, setSurahData] = useState<Surah | null>(null);
  const [showTranslation, setShowTranslation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');

  // Using the free Al-Quran Cloud API (no authentication required)
  const API_BASE_URL = 'https://api.alquran.cloud/v1';

  useEffect(() => {
    const fetchSurahList = async () => {
      try {
        console.log('Fetching surah list from:', `${API_BASE_URL}/meta`);
        
        const response = await axios.get(`${API_BASE_URL}/meta`);
        
        console.log('Surah list response:', response.data);
        
        if (response.data && response.data.data && response.data.data.surahs) {
          // Convert the surahs object to array
          const surahArray = Object.values(response.data.data.surahs.references) as SurahInfo[];
          setSurahs(surahArray);
          console.log('Processed surahs:', surahArray);
        } else {
          throw new Error('Invalid response structure');
        }
      } catch (err: any) {
        console.error('Error fetching surah list:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          config: err.config
        });
        setError('Failed to load surah list. Please try again.');
      }
    };
    
    fetchSurahList();
  }, []);

  useEffect(() => {
    const fetchSurah = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log('Fetching surah data for ID:', selectedSurah);
        
        // Fetch Arabic verses and English translation
        const [arabicResponse, translationResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/surah/${selectedSurah}`),
          axios.get(`${API_BASE_URL}/surah/${selectedSurah}/en.sahih`)
        ]);

        console.log('Arabic response:', arabicResponse.data);
        console.log('Translation response:', translationResponse.data);

        if (!arabicResponse.data?.data || !translationResponse.data?.data) {
          throw new Error('Invalid API response structure');
        }

        const arabicData = arabicResponse.data.data;
        const translationData = translationResponse.data.data;
        const bismillahText = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ';

        const surah: Surah = {
          number: arabicData.number,
          name: arabicData.name,
          verses: arabicData.ayahs.map((ayah: any) => {
            const verseData: Verse = {
              number: ayah.numberInSurah,
              text: ayah.text,
            };
            
            // Handle Bismillah (except for Surah 9 which doesn't have it)
            if (selectedSurah !== 9 && ayah.numberInSurah === 1 && ayah.text.startsWith(bismillahText)) {
              verseData.bismillah = bismillahText;
              verseData.text = ayah.text.replace(bismillahText, '').trim();
            }
            
            return verseData;
          }),
          translation: translationData.ayahs.map((ayah: any) => ({
            number: ayah.numberInSurah,
            text: ayah.text,
          })),
        };

        setSurahData(surah);
        console.log('Final surah data:', surah);
      } catch (err: any) {
        console.error('Error fetching surah:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          config: err.config
        });
        setError(`Failed to load surah data: ${err.response?.status || err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (selectedSurah && surahs.length > 0) {
      fetchSurah();
    }
  }, [selectedSurah, surahs]);

  // Custom styles for React Select with modern design
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: state.isFocused ? '#8b5cf6' : 'rgba(147, 51, 234, 0.3)',
      padding: '0.75rem',
      borderRadius: '1rem',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(139, 92, 246, 0.1)' : 'none',
      borderWidth: '2px',
      minHeight: '60px',
      transition: 'all 0.3s ease',
      '&:hover': {
        borderColor: '#8b5cf6',
        boxShadow: '0 4px 12px rgba(139, 92, 246, 0.15)',
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(12px)',
      borderRadius: '1rem',
      border: '1px solid rgba(147, 51, 234, 0.2)',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      zIndex: 9999,
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected 
        ? 'rgba(139, 92, 246, 0.1)' 
        : state.isFocused 
        ? 'rgba(139, 92, 246, 0.05)' 
        : 'transparent',
      color: state.isSelected ? '#7c3aed' : '#374151',
      padding: '12px 16px',
      fontWeight: state.isSelected ? '600' : '500',
      borderRadius: '0.5rem',
      margin: '2px',
      transition: 'all 0.2s ease',
      '&:hover': {
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        transform: 'translateX(4px)',
      },
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: '#374151',
      fontWeight: '600',
      fontSize: '16px',
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: '#9ca3af',
      fontWeight: '500',
    }),
  };

  // Map surahs to React Select options
  const surahOptions = surahs.map((surah) => ({
    value: surah.number,
    label: `${surah.number}. ${surah.englishName} (${surah.name})`,
  }));

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'small': return 'text-xl md:text-2xl';
      case 'medium': return 'text-2xl md:text-3xl';
      case 'large': return 'text-3xl md:text-4xl';
      default: return 'text-2xl md:text-3xl';
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f7f3e9] via-[#eef7f0] to-[#e8f4ec] dark:from-[#061f13] dark:via-[#0a2618] dark:to-[#0f3422] flex items-center justify-center">
        <div className="text-center p-8 bg-[#f7f3e9]/75 dark:bg-[#0f3422]/75 backdrop-blur-xl rounded-2xl border border-red-200 dark:border-red-800 shadow-xl max-w-md mx-4">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">خطأ في التحميل</h2>
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  if (loading || !surahData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f7f3e9] via-[#eef7f0] to-[#e8f4ec] dark:from-[#061f13] dark:via-[#0a2618] dark:to-[#0f3422] flex items-center justify-center">
        <div className="text-center p-8 bg-[#f7f3e9]/75 dark:bg-[#0f3422]/75 backdrop-blur-xl rounded-2xl border border-[#c27c18]/20 dark:border-[#177c52]/40 shadow-xl">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#177c52] border-t-transparent mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">جاري التحميل...</h2>
          <p className="text-slate-600 dark:text-slate-300">يتم تحميل السورة الكريمة</p>
          {surahs.length === 0 && (
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              جاري تحميل قائمة السور...
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Add Google Fonts and Arabic font styles */}
      <style jsx global>{`
        ${googleFontsLink}
        
        .font-arabic {
          font-family: 'Amiri', 'Scheherazade New', 'Noto Sans Arabic', 'Arabic UI Display', 'SF Arabic', 'Geeza Pro', 'Times New Roman', serif !important;
          font-feature-settings: 'liga' 1, 'dlig' 1, 'kern' 1;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          direction: rtl;
          unicode-bidi: bidi-override;
        }
        
        /* Ensure proper Arabic character rendering */
        .font-arabic * {
          font-family: inherit !important;
        }
        
        /* Fix for specific Arabic characters */
        .font-arabic {
          font-variant-ligatures: common-ligatures contextual;
          font-kerning: auto;
        }
      `}</style>
      
      <div className="min-h-screen bg-gradient-to-br from-[#f7f3e9] via-[#eef7f0] to-[#e8f4ec] dark:from-[#061f13] dark:via-[#0a2618] dark:to-[#0f3422]">
      {/* Hero Section */}
      <section className="relative pt-24 pb-12">
        <div className="w-[95%]  mx-auto px-4">
          <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/quran-cover.jpg"
              alt="القرآن الكريم"
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-3xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/30 to-teal-600/30" />
            
            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <BookOpenIcon className="w-16 h-16 text-white mx-auto mb-4" />
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                  القرآن الكريم
                </h1>
                <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                  اقرأ وتدبر آيات الله الحكيم
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Controls Section */}
      <section className="relative z-[2] py-8">
        <div className="w-[95%]  mx-auto px-4">
          <div className="bg-[#f7f3e9]/65 dark:bg-[#0f3422]/65 backdrop-blur-xl rounded-2xl p-6 border border-[#c27c18]/20 dark:border-[#177c52]/40 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
              {/* Surah Selection */}
              <div className="space-y-3">
                <label htmlFor="surah-select" className="flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-white">
                  <BookOpenIcon className="w-5 h-5 text-[#177c52]" />
                  اختر السورة
                </label>
                <Select
                  id="surah-select"
                  options={surahOptions}
                  value={surahOptions.find((option) => option.value === selectedSurah)}
                  onChange={(option) => setSelectedSurah(option ? option.value : 1)}
                  styles={customStyles}
                  className="w-full"
                  classNamePrefix="react-select"
                  placeholder="ابحث عن السورة..."
                  isSearchable
                  isDisabled={surahs.length === 0}
                />
              </div>

              {/* Translation Toggle */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-white">
                  <LanguageIcon className="w-5 h-5 text-[#177c52]" />
                  الترجمة
                </label>
                <button
                  onClick={() => setShowTranslation(!showTranslation)}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    showTranslation
                      ? 'bg-gradient-to-r from-[#177c52] to-[#0a5c34] text-white shadow-lg shadow-[#177c52]/25'
                      : 'bg-gradient-to-r from-[#c27c18] to-[#8a530d] text-white shadow-lg shadow-[#c27c18]/25'
                  }`}
                >
                  {showTranslation ? 'إخفاء الترجمة' : 'إظهار الترجمة'}
                </button>
              </div>

              {/* Font Size Control */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-white">
                  <span className="text-lg">Aa</span>
                  حجم الخط
                </label>
                <div className="flex gap-2">
                  {(['small', 'medium', 'large'] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => setFontSize(size)}
                      className={`flex-1 py-2 px-3 rounded-lg font-medium transition-all duration-300 ${
                        fontSize === size
                          ? 'bg-[#177c52] text-white shadow-lg'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-[#d9f2e6] dark:hover:bg-[#0a5c34]/40'
                      }`}
                    >
                      {size === 'small' ? 'صغير' : size === 'medium' ? 'متوسط' : 'كبير'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Surah Content */}
      <section className="relative z-[1] py-8">
        <div className="w-[95%] mx-auto px-4">
          {/* Surah Header */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-[#177c52] to-[#0a5c34] rounded-2xl p-6 text-white shadow-xl border border-[#efb63c]/20">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                {surahData.name}
              </h2>
              <p className="text-[#d9f2e6] text-lg">
                السورة رقم {surahData.number} • {surahData.verses.length} آية
              </p>
            </div>
          </div>

          {/* Verses */}
          <div className="space-y-6">
            {surahData.verses.map((verse, index) => (
              <div
                key={verse.number}
                className="group bg-[#f7f3e9]/65 dark:bg-[#0f3422]/65 backdrop-blur-xl rounded-2xl p-6 border border-[#c27c18]/20 dark:border-[#177c52]/40 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Bismillah */}
                {verse.bismillah && (
                  <div className="text-center mb-6">
                    <div className="inline-block bg-gradient-to-r from-[#eef7f0] to-[#fdf8e8] dark:from-[#0a5c34]/30 dark:to-[#8a530d]/25 rounded-xl p-4 border border-[#c27c18]/25 dark:border-[#177c52]/40">
                      <p className={`font-arabic text-[#0a5c34] dark:text-[#47b484] ${getFontSizeClass()} leading-relaxed`}>
                        {verse.bismillah}
                      </p>
                    </div>
                  </div>
                )}

                {/* Verse content */}
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Verse number */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#177c52] to-[#0a5c34] rounded-full flex items-center justify-center shadow-lg border border-[#efb63c]/30">
                      <span className="text-white font-bold text-lg">{verse.number}</span>
                    </div>
                  </div>

                  {/* Arabic text */}
                  <div className="flex-1">
                    <div className="text-right mb-4">
                      <p className={`font-arabic text-slate-800 dark:text-white leading-relaxed ${getFontSizeClass()}`}>
                        {verse.text}
                        <span className="inline-block w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full text-white text-sm font-bold leading-8 text-center mr-2">
                          {verse.number}
                        </span>
                      </p>
                    </div>

                    {/* Translation */}
                    {showTranslation && surahData.translation && (
                      <div className="bg-gradient-to-r from-[#eef7f0] to-[#f4f1e8] dark:from-[#0c3320] dark:to-[#0f2e1c] rounded-xl p-4 border border-[#b0d4bc] dark:border-[#1e5c3a]">
                        <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
                          {surahData.translation.find((t) => t.number === verse.number)?.text}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom spacing */}
      <div className="pb-12"></div>
      </div>
    </>
  );
}