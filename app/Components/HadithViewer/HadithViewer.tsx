'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { BookOpenIcon, UserIcon, ClipboardDocumentListIcon, MagnifyingGlassIcon, XMarkIcon, StarIcon, ClockIcon } from '@heroicons/react/24/outline';

// Enhanced interfaces
interface HadithBook {
  bookId: number;
  bookName: string;
  bookDescription: string;
}

interface Hadith {
  hadithId: number;
  hadithText: string;
  hadithTitle?: string;
  chapterNumber?: number;
  chapterTitle?: string;
  narrator: string;
  reference: string;
  grade?: string;
}

interface SearchResult {
  hadith: Hadith;
  score: number;
  matches: {
    hadithText: boolean;
    hadithTitle: boolean;
    narrator: boolean;
    reference: boolean;
    chapterTitle: boolean;
  };
  relevanceFactors: string[];
}

// Ultra-fast search engine optimized for 4 books only
class OptimizedSearchEngine {
  private textIndex = new Map<string, Set<number>>();
  private trigramIndex = new Map<string, Set<number>>();
  private narratorIndex = new Map<string, Set<number>>();
  private resultCache = new Map<string, SearchResult[]>();
  private preprocessedTexts: string[] = [];
  private isIndexed = false;
  
  // High-performance text preprocessing
  private preprocessText(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }
  
  // Generate trigrams for partial matching
  private generateTrigrams(text: string): string[] {
    const trigrams: string[] = [];
    const normalized = this.preprocessText(text);
    
    for (let i = 0; i <= normalized.length - 3; i++) {
      trigrams.push(normalized.slice(i, i + 3));
    }
    
    return trigrams;
  }
  
  // Optimized index building for speed
  buildIndex(hadiths: Hadith[]): void {
    console.time('🔧 Building optimized search index');
    
    // Clear existing data
    this.textIndex.clear();
    this.trigramIndex.clear();
    this.narratorIndex.clear();
    this.resultCache.clear();
    this.preprocessedTexts = [];
    
    // Process in optimized batches
    hadiths.forEach((hadith, index) => {
      const fullText = `${hadith.hadithText} ${hadith.narrator} ${hadith.reference}`;
      const preprocessed = this.preprocessText(fullText);
      
      this.preprocessedTexts[index] = preprocessed;
      
      // Index key words only (performance optimization)
      const words = preprocessed.split(/\s+/).filter(word => word.length > 2);
      words.forEach(word => {
        if (!this.textIndex.has(word)) {
          this.textIndex.set(word, new Set());
        }
        this.textIndex.get(word)!.add(index);
      });
      
      // Selective trigram indexing for key terms
      if (words.length < 50) { // Only index shorter texts to maintain speed
        const trigrams = this.generateTrigrams(preprocessed);
        trigrams.forEach(trigram => {
          if (!this.trigramIndex.has(trigram)) {
            this.trigramIndex.set(trigram, new Set());
          }
          this.trigramIndex.get(trigram)!.add(index);
        });
      }
      
      // Index narrator separately
      const narratorWords = this.preprocessText(hadith.narrator).split(/\s+/);
      narratorWords.forEach(word => {
        if (word.length > 2) {
          if (!this.narratorIndex.has(word)) {
            this.narratorIndex.set(word, new Set());
          }
          this.narratorIndex.get(word)!.add(index);
        }
      });
    });
    
    this.isIndexed = true;
    console.timeEnd('🔧 Building optimized search index');
    console.log(`⚡ Indexed ${hadiths.length} hadiths with ${this.textIndex.size} unique terms`);
  }
  
  // Lightning-fast search
  search(query: string, hadiths: Hadith[]): SearchResult[] {
    if (!query.trim() || !this.isIndexed) return [];
    
    const normalizedQuery = this.preprocessText(query);
    
    // Instant cache hit
    if (this.resultCache.has(normalizedQuery)) {
      return this.resultCache.get(normalizedQuery)!;
    }
    
    const queryWords = normalizedQuery.split(/\s+/).filter(word => word.length > 0);
    const candidateScores = new Map<number, number>();
    const matchDetails = new Map<number, {
      hadithText: boolean;
      hadithTitle: boolean;
      narrator: boolean;
      reference: boolean;
      chapterTitle: boolean;
      relevanceFactors: string[];
    }>();
    
    // Fast exact word matching
    queryWords.forEach(word => {
      // Text matches
      if (this.textIndex.has(word)) {
        this.textIndex.get(word)!.forEach(index => {
          candidateScores.set(index, (candidateScores.get(index) || 0) + 50);
          const details = matchDetails.get(index) || { 
            hadithText: false, hadithTitle: false, narrator: false, 
            reference: false, chapterTitle: false, relevanceFactors: [] 
          };
          details.hadithText = true;
          details.relevanceFactors.push('نص الحديث');
          matchDetails.set(index, details);
        });
      }
      
      // Narrator matches (higher weight)
      if (this.narratorIndex.has(word)) {
        this.narratorIndex.get(word)!.forEach(index => {
          candidateScores.set(index, (candidateScores.get(index) || 0) + 80);
          const details = matchDetails.get(index) || { 
            hadithText: false, hadithTitle: false, narrator: false, 
            reference: false, chapterTitle: false, relevanceFactors: [] 
          };
          details.narrator = true;
          details.relevanceFactors.push('الراوي');
          matchDetails.set(index, details);
        });
      }
    });
    
    // Quick phrase matching for multi-word queries
    if (queryWords.length > 1) {
      const phraseQuery = normalizedQuery;
      for (let i = 0; i < this.preprocessedTexts.length; i++) {
        if (this.preprocessedTexts[i]?.includes(phraseQuery)) {
          candidateScores.set(i, (candidateScores.get(i) || 0) + 100);
          const details = matchDetails.get(i) || { 
            hadithText: false, hadithTitle: false, narrator: false, 
            reference: false, chapterTitle: false, relevanceFactors: [] 
          };
          details.hadithText = true;
          details.relevanceFactors.push('تطابق العبارة الكاملة');
          matchDetails.set(i, details);
        }
      }
    }
    
    // Convert to results with simplified scoring
    const results: SearchResult[] = Array.from(candidateScores.entries())
      .map(([index, baseScore]) => {
        const hadith = hadiths[index];
        const details = matchDetails.get(index)!;
        
        return {
          hadith,
          score: baseScore,
          matches: {
            hadithText: details.hadithText,
            hadithTitle: details.hadithTitle,
            narrator: details.narrator,
            reference: details.reference,
            chapterTitle: details.chapterTitle
          },
          relevanceFactors: details.relevanceFactors
        };
      })
      .filter(result => result.score > 20)
      .sort((a, b) => b.score - a.score)
      .slice(0, 100); // Limit for performance
    
    // Cache for instant future access
    this.resultCache.set(normalizedQuery, results);
    
    return results;
  }
  
  // Preload essential searches
  preloadEssentialSearches(hadiths: Hadith[]): void {
    const essentialTerms = ['الله', 'الرسول', 'النبي', 'الصلاة'];
    
    setTimeout(() => {
      essentialTerms.forEach(term => {
        this.search(term, hadiths);
      });
      console.log('🚀 Preloaded essential searches');
    }, 100);
  }
  
  getStats() {
    return {
      indexedTerms: this.textIndex.size,
      cachedQueries: this.resultCache.size,
      narratorTerms: this.narratorIndex.size
    };
  }
}

// Fast debounce
function useFastDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, delay]);

  return debouncedValue;
}

const HadithViewer: React.FC = () => {
  const [books, setBooks] = useState<HadithBook[]>([]);
  const [hadiths, setHadiths] = useState<Hadith[]>([]);
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const [selectedBook, setSelectedBook] = useState<number | null>(null);
  const [selectedBookName, setSelectedBookName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [booksLoading, setBooksLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showHadiths, setShowHadiths] = useState<boolean>(false);
  const [responseTime, setResponseTime] = useState<number>(0);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchStats, setSearchStats] = useState<any>({});
  
  // Fast debounced search
  const debouncedSearchQuery = useFastDebounce(searchQuery, 100);
  
  // Search engine instance
  const searchEngine = useRef<OptimizedSearchEngine>(new OptimizedSearchEngine());

  // Memoized display hadiths
  const displayHadiths = useMemo(() => {
    if (filteredResults.length > 0) {
      return filteredResults.map(result => result.hadith);
    }
    return hadiths;
  }, [filteredResults, hadiths]);

  // Initialize search index
  useEffect(() => {
    if (hadiths.length > 0) {
      setTimeout(() => {
        searchEngine.current.buildIndex(hadiths);
        searchEngine.current.preloadEssentialSearches(hadiths);
        setSearchStats(searchEngine.current.getStats());
      }, 50);
    }
  }, [hadiths]);

  // Fast search execution
  useEffect(() => {
    if (!debouncedSearchQuery.trim()) {
      setFilteredResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    
    setTimeout(() => {
      try {
        const results = searchEngine.current.search(debouncedSearchQuery, hadiths);
        setFilteredResults(results);
        setSearchStats(searchEngine.current.getStats());
      } catch (error) {
        console.error('Search error:', error);
        setFilteredResults([]);
      }
      setIsSearching(false);
    }, 5);
  }, [debouncedSearchQuery, hadiths]);

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setFilteredResults([]);
    setIsSearching(false);
  }, []);

  // Fast highlighting
  const highlightSearchTerm = useCallback((text: string, query: string) => {
    if (!query.trim()) return text;
    
    try {
      const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(${escapedQuery})`, 'gi');
      const parts = text.split(regex);

      return parts.map((part, index) =>
        regex.test(part) ? (
          <mark key={index} className="bg-yellow-200 dark:bg-yellow-600 px-1 rounded font-semibold">
            {part}
          </mark>
        ) : part
      );
    } catch (error: unknown) {
      return text;
    }
  }, [searchQuery]);

  // Fast book fetching
  useEffect(() => {
    const fetchBooks = async () => {
      setBooksLoading(true);
      setError(null);
      try {
        const startTime = Date.now();
        console.log('📚 Fetching optimized book list...');
        const response = await fetch('/api/hadith');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const fetchTime = Date.now() - startTime;
        setResponseTime(fetchTime);
        
        console.log(`✅ Books loaded in ${fetchTime}ms:`, data);
        
        if (data.success && data.books && Array.isArray(data.books)) {
          setBooks(data.books);
          console.log(`📖 ${data.books.length} books loaded successfully (cached: ${data.cached || false})`);
        } else {
          throw new Error(data.message || 'Invalid response format');
        }
      } catch (err) {
        console.error('❌ Error fetching books:', err);
        setError(err instanceof Error ? err.message : 'Error fetching books');
      } finally {
        setBooksLoading(false);
      }
    };
    
    fetchBooks();
  }, []);

  // Enhanced hadith fetching with performance tracking
  const fetchHadiths = async () => {
    if (!selectedBook) return;
    
    setLoading(true);
    setError(null);
    setHadiths([]);
    setFilteredResults([]);
    setShowHadiths(false);
    clearSearch();
    
    try {
      console.log(`🚀 Fetching hadiths for book ${selectedBook}...`);
      const startTime = Date.now();
      
      const response = await fetch(`/api/hadith?bookId=${selectedBook}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const fetchTime = Date.now() - startTime;
      setResponseTime(fetchTime);
      
      console.log(`⚡ API Response in ${fetchTime}ms:`, {
        cached: data.cached,
        total: data.total,
        cacheAge: data.cacheAge,
        performance: data.performance
      });
      
      if (data.success && data.hadiths && Array.isArray(data.hadiths)) {
        setHadiths(data.hadiths);
        setShowHadiths(true);
        console.log(`📝 ${data.hadiths.length} valid hadiths loaded successfully`);
        
        // Log filtering info if available
        if (data.performance?.processingTime) {
          console.log(`🔍 Content validation completed in ${data.performance.processingTime}ms`);
        }
      } else {
        throw new Error(data.message || 'Invalid response format');
      }
    } catch (err) {
      console.error('❌ Error fetching hadiths:', err);
      setError(err instanceof Error ? err.message : 'Error fetching hadiths');
    } finally {
      setLoading(false);
    }
  };

  // Handle book selection
  const handleBookSelection = (bookId: number) => {
    const book = books.find(b => b.bookId === bookId);
    setSelectedBook(bookId);
    setSelectedBookName(book ? book.bookName : '');
    setShowHadiths(false);
    setHadiths([]);
    setFilteredResults([]);
    setError(null);
    clearSearch();
  };

  return (
    <div className="md:w-[95%] w-full mx-auto p-6">
      {/* Enhanced Header with Performance Stats */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <BookOpenIcon className="w-8 h-8 text-emerald-600" />
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
            الأحاديث النبوية الشريفة
          </h1>
        </div>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-4">
          مجموعة مختارة من أهم كتب الأحاديث مع البحث الفوري المحسن
        </p>
        
        {/* Performance Display with Cache Information */}
        <div className="flex items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
          {responseTime > 0 && (
            <div className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4 text-green-500" />
              <span>آخر استجابة: {responseTime}ms</span>
            </div>
          )}
          
          {searchStats.indexedTerms > 0 && (
            <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800 rounded-lg px-4 py-2">
              <div className="text-center">
                <div className="font-semibold text-emerald-600">{searchStats.indexedTerms.toLocaleString()}</div>
                <div className="text-xs">مصطلح مفهرس</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-blue-600">{searchStats.cachedQueries}</div>
                <div className="text-xs">بحث محفوظ</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-purple-600">{books.length}</div>
                <div className="text-xs">كتاب متاح</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
          <div className="flex items-center gap-2">
            <span className="text-red-500 text-xl">⚠️</span>
            <p className="text-red-700 dark:text-red-400 font-medium">خطأ في التحميل</p>
          </div>
          <p className="text-red-600 dark:text-red-300 text-sm mt-1">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm"
          >
            إعادة المحاولة
          </button>
        </div>
      )}

      {/* Optimized Book Selection */}
      <div className="mb-8">
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-slate-700/50 shadow-xl">
          <label htmlFor="bookSelect" className="flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-white mb-4">
            <ClipboardDocumentListIcon className="w-5 h-5 text-emerald-600" />
            اختر كتاب الحديث ({books.length} كتب متاحة)
            <span className="text-xs bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300 px-2 py-1 rounded-full">
              مع ذاكرة تخزين ذكية
            </span>
          </label>
          
          {booksLoading ? (
            <div className="flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-emerald-500 border-t-transparent"></div>
              <span className="text-emerald-700 dark:text-emerald-300">جاري تحميل جميع الكتب المتاحة...</span>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Enhanced Book Grid with More Books */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {books.map((book) => (
                  <button
                    key={book.bookId}
                    onClick={() => handleBookSelection(book.bookId)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 text-right ${
                      selectedBook === book.bookId
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 shadow-md'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-emerald-300 hover:shadow-md'
                    }`}
                  >
                    <div className="font-semibold text-slate-800 dark:text-white mb-1">
                      {book.bookName}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {book.bookDescription}
                    </div>
                    {/* Popular book indicator */}
                    {['صحيح البخاري', 'صحيح مسلم', 'رياض الصالحين', 'بلوغ المرام'].includes(book.bookName) && (
                      <div className="mt-2">
                        <span className="text-xs bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 px-2 py-1 rounded-full">
                          شائع
                        </span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
              
              {/* Enhanced Load Button */}
              {selectedBook && (
                <button
                  onClick={fetchHadiths}
                  disabled={loading}
                  className="w-full p-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      جاري التحميل   ...
                    </div>
                  ) : (
                    `⚡ تحميل فوري مع ذاكرة ذكية - ${selectedBookName}`
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Ultra-Fast Search Section */}
      {showHadiths && hadiths.length > 0 && !loading && (
        <div className="mb-8">
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-slate-700/50 shadow-xl">
            <label htmlFor="hadithSearch" className="flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-white mb-4">
              <MagnifyingGlassIcon className="w-5 h-5 text-blue-600" />
              بحث فوري متقدم
              <span className="text-xs bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 px-2 py-1 rounded-full">
                ذاكرة ذكية
              </span>
            </label>
            
            <div className="relative">
              <input
                id="hadithSearch"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث في جميع النصوص والرواة... (بحث فوري مع ذاكرة ذكية)"
                className="w-full p-4 pr-12 pl-12 border-2 border-blue-200 dark:border-blue-800 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300"
                dir="rtl"
              />
              
              <MagnifyingGlassIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  title="مسح البحث"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              )}
              
              {isSearching && (
                <div className="absolute left-12 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
                </div>
              )}
            </div>
            
            {/* Search Results Summary */}
            {searchQuery && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center justify-between">
                  <p className="text-blue-800 dark:text-blue-300 text-sm">
                    {filteredResults.length > 0 
                      ? `⚡ ${filteredResults.length} نتيجة من ${hadiths.length} حديث`
                      : 'لم يتم العثور على نتائج'
                    }
                  </p>
                  {filteredResults.length > 0 && (
                    <span className="text-xs bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 px-2 py-1 rounded-full">
                      مرتب حسب الصلة
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Enhanced Hadith Display */}
      {showHadiths && displayHadiths.length > 0 && !loading && (
        <div className="space-y-6">
          {/* Section Header */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-xl">
              <h2 className="text-2xl font-bold mb-2">
                {selectedBookName}
              </h2>
              <div className="flex items-center justify-center gap-4">
                <p className="text-emerald-100">
                  {searchQuery 
                    ? `${filteredResults.length} من ${hadiths.length} حديث صحيح المحتوى`
                    : `${hadiths.length} حديث صحيح المحتوى`
                  }
                </p>
                <span className="text-xs bg-white/20 text-white px-2 py-1 rounded-full">
                  ذاكرة ذكية متقدمة
                </span>
              </div>
            </div>
          </div>

          {/* Optimized Hadiths List */}
          {displayHadiths.slice(0, 50).map((hadith, index) => {
            const searchResult = filteredResults.find(r => r.hadith.hadithId === hadith.hadithId);
            const matches = searchResult?.matches;
            
            // Additional validation - skip any hadith that somehow has invalid content
            if (!hadith.hadithText || hadith.hadithText.trim().length < 10) {
              return null;
            }
            
            return (
              <div 
                key={hadith.hadithId} 
                className={`group bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01] ${
                  searchResult ? 'ring-2 ring-blue-300 dark:ring-blue-600 shadow-blue-100 dark:shadow-blue-900/20' : ''
                }`}
              >
                {/* Hadith Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">{hadith.hadithId}</span>
                  </div>
                  
                  {/* Search Score */}
                  {searchResult && (
                    <div className="flex items-center gap-2">
                      <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900 rounded-full text-xs font-medium text-blue-800 dark:text-blue-200">
                        درجة الصلة: {Math.round((searchResult.score / Math.max(...filteredResults.map(r => r.score))) * 100)}%
                      </div>
                      {searchResult.relevanceFactors.length > 0 && (
                        <div className="text-xs text-blue-600 dark:text-blue-400" title={searchResult.relevanceFactors.join(' • ')}>
                          <StarIcon className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="h-px flex-1 bg-gradient-to-r from-emerald-200 to-transparent dark:from-emerald-800"></div>
                </div>

                {/* Hadith Text */}
                <div className="mb-6">
                  <p className="text-lg md:text-xl leading-relaxed text-slate-800 dark:text-white text-right font-arabic">
                    {highlightSearchTerm(hadith.hadithText, searchQuery)}
                  </p>
                  {matches?.hadithText && (
                    <div className="mt-2 text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      تطابق في نص الحديث
                    </div>
                  )}
                </div>

                {/* Hadith Details Grid */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Narrator */}
                  <div className={`bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border ${
                    matches?.narrator ? 'border-blue-400 dark:border-blue-600 shadow-md' : 'border-blue-200 dark:border-blue-800'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <UserIcon className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-blue-800 dark:text-blue-300">الراوي</span>
                      {matches?.narrator && (
                        <span className="text-xs bg-blue-200 dark:bg-blue-700 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                          تطابق
                        </span>
                      )}
                    </div>
                    <p className="text-blue-700 dark:text-blue-200">
                      {highlightSearchTerm(hadith.narrator, searchQuery)}
                    </p>
                  </div>
                  
                  {/* Reference */}
                  <div className={`bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border ${
                    matches?.reference ? 'border-purple-400 dark:border-purple-600 shadow-md' : 'border-purple-200 dark:border-purple-800'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpenIcon className="w-5 h-5 text-purple-600" />
                      <span className="font-semibold text-purple-800 dark:text-purple-300">المرجع</span>
                      {matches?.reference && (
                        <span className="text-xs bg-purple-200 dark:bg-purple-700 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full">
                          تطابق
                        </span>
                      )}
                    </div>
                    <p className="text-purple-700 dark:text-purple-200">
                      {highlightSearchTerm(hadith.reference, searchQuery)}
                    </p>
                  </div>
                </div>

                {/* Search Relevance Details */}
                {searchResult && searchResult.relevanceFactors.length > 0 && (
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <div className="text-xs text-blue-800 dark:text-blue-300">
                      <span className="font-medium">أسباب الصلة: </span>
                      {searchResult.relevanceFactors.join(' • ')}
                    </div>
                  </div>
                )}
              </div>
            );
          }).filter(Boolean)} {/* Filter out any null entries */}

          {/* Load More Results */}
          {filteredResults.length > 50 && (
            <div className="text-center py-8">
              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-slate-700/50 shadow-xl inline-block">
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  عرض أول 50 نتيجة من أصل {filteredResults.length} نتيجة
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  💡 استخدم كلمات أكثر تحديداً لتضييق نطاق البحث
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* No Search Results */}
      {showHadiths && searchQuery && filteredResults.length === 0 && !loading && !isSearching && (
        <div className="text-center py-12">
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-8 border border-white/20 dark:border-slate-700/50 shadow-xl inline-block">
            <MagnifyingGlassIcon className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
              لم يتم العثور على نتائج
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              لم يتم العثور على أحاديث تحتوي على "{searchQuery}"
            </p>
            <div className="space-y-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
              <p>💡 نصائح للبحث المحسن:</p>
              <ul className="text-right space-y-1">
                <li>• جرب كلمات أكثر عمومية</li>
                <li>• استخدم أسماء الرواة المشهورين</li>
                <li>• ابحث بجذور الكلمات</li>
                <li>• جرب البحث بكلمة واحدة</li>
              </ul>
            </div>
            <button
              onClick={clearSearch}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              مسح البحث
            </button>
          </div>
        </div>
      )}

      {/* Instructions for New Users */}
      {!selectedBook && books.length > 0 && !booksLoading && (
        <div className="text-center py-12">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-8 border border-emerald-200 dark:border-emerald-800 inline-block max-w-2xl">
            <BookOpenIcon className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-emerald-800 dark:text-emerald-300 mb-2">
              اختر كتاب الحديث
            </h3>
            <p className="text-emerald-700 dark:text-emerald-200 mb-6">
              مجموعة شاملة من {books.length} كتب الأحاديث النبوية الشريفة مع نظام ذاكرة ذكي
            </p>
            <div className="text-sm text-emerald-600 dark:text-emerald-300 space-y-2">
              <p className="font-semibold">🚀 مميزات النظام المتقدم:</p>
              <div className="grid md:grid-cols-2 gap-2 mt-3 text-right">
                <ul className="space-y-1">
                  <li>• {books.length} كتب حديث شاملة</li>
                  <li>• ذاكرة تخزين متعددة المستويات</li>
                  <li>• تحميل متوازي من عدة مصادر</li>
                  <li>• فهرسة ذكية للبحث السريع</li>
                </ul>
                <ul className="space-y-1">
                  <li>• استجابة فورية للكتب الشائعة</li>
                  <li>• تحليل ذكي لاستخدام الذاكرة</li>
                  <li>• تحديث تلقائي للبيانات</li>
                  <li>• واجهة محسنة للأداء</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HadithViewer;