import { NextResponse } from 'next/server';

// Interfaces for type safety
interface HadithBook {
  bookId: number;
  bookName: string;
  bookDescription: string;
}

interface Hadith {
  hadithId: number;
  hadithText: string;
  narrator: string;
  reference: string;
}

interface CachedData {
  data: any;
  timestamp: number;
  expiresAt: number;
  accessCount: number;
  lastAccessed: number;
}

interface HadithApiResponse {
  hadiths: Hadith[];
  success: boolean;
  total: number;
  bookName: string;
  cached?: boolean;
  cacheAge?: number;
  pagination?: {
    currentPage: number;
    totalPages: number;
    limit: number;
    offset: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  performance?: {
    responseTime: number;
    cacheHit: boolean;
    processingTime?: number;
    fetchTime?: number;
  };
}

// Multi-tier caching system
const cache = new Map<string, CachedData>();
const bookListCache = new Map<string, any>();
const metadataCache = new Map<string, any>();

// Enhanced cache configuration
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days for processed data
const METADATA_TTL = 24 * 60 * 60 * 1000; // 24 hours for metadata
const POPULAR_BOOKS_TTL = 30 * 24 * 60 * 60 * 1000; // 30 days for popular books
const MAX_CACHE_SIZE = 50; // Prevent memory overflow

// Complete book mapping with all available books (verified against external API)
const BOOK_MAPPING: { [key: string]: { id: number; name: string; description: string } } = {
  'bukhari': { id: 1, name: 'صحيح البخاري', description: 'Sahih al-Bukhari' },
  'muslim': { id: 2, name: 'صحيح مسلم', description: 'Sahih Muslim' },
  'tirmidhi': { id: 3, name: 'سنن الترمذي', description: 'Jami` at-Tirmidhi' },
  'abudawud': { id: 4, name: 'سنن أبي داود', description: 'Sunan Abi Dawud' },
  'nasai': { id: 5, name: 'سنن النسائي', description: 'Sunan an-Nasa\'i' },
  'ibnmajah': { id: 6, name: 'سنن ابن ماجه', description: 'Sunan Ibn Majah' },
  'malik': { id: 7, name: 'موطأ مالك', description: 'Muwatta Malik' },
  'nawawi': { id: 8, name: 'الأربعون النووية', description: 'Forty Hadith of an-Nawawi' },
  'qudsi': { id: 9, name: 'الأحاديث القدسية', description: 'Forty Hadith Qudsi' },
  
};

// Popular books with longer cache times (verified against external API)
const POPULAR_BOOKS = ['bukhari', 'muslim', 'nawawi', 'tirmidhi'];

// Advanced cache helper functions
function getCachedData(key: string): CachedData | null {
  const cached = cache.get(key);
  if (cached && Date.now() < cached.expiresAt) {
    // Update access statistics
    cached.accessCount++;
    cached.lastAccessed = Date.now();
    return cached;
  }
  if (cached) {
    cache.delete(key); // Remove expired cache
  }
  return null;
}

function setCachedData(key: string, data: any, customTTL?: number): void {
  // Implement LRU eviction if cache is too large
  if (cache.size >= MAX_CACHE_SIZE) {
    const oldestKey = Array.from(cache.entries())
      .sort(([,a], [,b]) => a.lastAccessed - b.lastAccessed)[0][0];
    cache.delete(oldestKey);
    console.log(`🗑️ Evicted oldest cache entry: ${oldestKey}`);
  }

  const now = Date.now();
  const isPopularBook = POPULAR_BOOKS.some(book => key.includes(book));
  const ttl = customTTL || (isPopularBook ? POPULAR_BOOKS_TTL : CACHE_TTL);
  
  cache.set(key, {
    data,
    timestamp: now,
    expiresAt: now + ttl,
    accessCount: 1,
    lastAccessed: now
  });
}

// Parallel fetch with multiple CDN fallbacks
async function fetchWithParallelCDNs(bookKey: string): Promise<Response> {
  const urls = [
    `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-${bookKey}.json`,
    `https://raw.githubusercontent.com/fawazahmed0/hadith-api/1/editions/ara-${bookKey}.json`,
    `https://gitcdn.link/repo/fawazahmed0/hadith-api/1/editions/ara-${bookKey}.json`
  ];

  // Race all URLs for fastest response
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const promises = urls.map(url => 
      fetch(url, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'public, max-age=86400',
          'Accept-Encoding': 'gzip, deflate, br'
        }
      })
    );

    const response = await Promise.race(promises);
    clearTimeout(timeoutId);
    
    if (response.ok) {
      return response;
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

// Optimized text extraction with caching and validation
const extractTextCache = new Map<string, string | null>();

function extractText(textObj: any): string | null {
  if (typeof textObj === 'string') {
    // Check if the string is meaningful (not just whitespace or placeholder)
    const trimmed = textObj.trim();
    if (!trimmed || trimmed === 'نص الحديث غير متوفر' || trimmed.length < 10) {
      return null;
    }
    return trimmed;
  }
  
  if (!textObj || typeof textObj !== 'object') return null;
  
  const cacheKey = JSON.stringify(textObj);
  if (extractTextCache.has(cacheKey)) {
    return extractTextCache.get(cacheKey)!;
  }
  
  // Try multiple possible fields for hadith text
  const possibleTexts = [
    textObj.text,
    textObj.arab, 
    textObj.arabic,
    textObj.body,
    textObj.content,
    textObj.hadith,
    textObj.matn
  ];
  
  for (const text of possibleTexts) {
    if (typeof text === 'string') {
      const trimmed = text.trim();
      // Validate that the text is meaningful
      if (trimmed && 
          trimmed !== 'نص الحديث غير متوفر' && 
          trimmed.length >= 10 && // Minimum meaningful length
          !trimmed.match(/^[0-9\s\-\.]+$/)) { // Not just numbers/punctuation
        extractTextCache.set(cacheKey, trimmed);
        return trimmed;
      }
    }
  }
  
  extractTextCache.set(cacheKey, null);
  return null;
}

// Enhanced narrator extraction with validation
const extractNarratorCache = new Map<string, string | null>();

function extractNarrator(hadithObj: any): string | null {
  if (typeof hadithObj === 'string') {
    const trimmed = hadithObj.trim();
    if (!trimmed || trimmed === 'راوي غير معروف' || trimmed.length < 3) {
      return null;
    }
    return trimmed;
  }
  
  if (!hadithObj || typeof hadithObj !== 'object') return null;
  
  const cacheKey = JSON.stringify(hadithObj);
  if (extractNarratorCache.has(cacheKey)) {
    return extractNarratorCache.get(cacheKey)!;
  }
  
  const narratorFields = ['narrator', 'attribution', 'name', 'chain', 'isnad', 'transmitter', 'rawi'];
  
  for (const field of narratorFields) {
    const narrator = hadithObj[field];
    if (typeof narrator === 'string') {
      const trimmed = narrator.trim();
      if (trimmed && trimmed !== 'راوي غير معروف' && trimmed.length >= 3) {
        extractNarratorCache.set(cacheKey, trimmed);
        return trimmed;
      }
    }
    if (narrator && typeof narrator === 'object') {
      const narratorText = narrator.name || narrator.text || narrator.arab;
      if (typeof narratorText === 'string') {
        const trimmed = narratorText.trim();
        if (trimmed && trimmed !== 'راوي غير معروف' && trimmed.length >= 3) {
          extractNarratorCache.set(cacheKey, trimmed);
          return trimmed;
        }
      }
    }
  }
  
  extractNarratorCache.set(cacheKey, null);
  return null;
}

// Optimized reference extraction with caching
const extractReferenceCache = new Map<string, string>();

function extractReference(hadithObj: any, bookName: string, index: number): string {
  if (typeof hadithObj === 'string') return hadithObj;
  if (!hadithObj || typeof hadithObj !== 'object') return `${bookName} - ${index + 1}`;
  
  const cacheKey = `${JSON.stringify(hadithObj)}_${bookName}_${index}`;
  if (extractReferenceCache.has(cacheKey)) {
    return extractReferenceCache.get(cacheKey)!;
  }
  
  const referenceFields = ['reference', 'grades', 'source', 'grading', 'classification'];
  
  for (const field of referenceFields) {
    const reference = hadithObj[field];
    
    if (typeof reference === 'string') {
      extractReferenceCache.set(cacheKey, reference);
      return reference;
    }
    
    if (Array.isArray(reference)) {
      const refStrings = reference
        .map(ref => {
          if (typeof ref === 'string') return ref;
          if (ref && typeof ref === 'object') {
            return ref.name || ref.text || ref.grade || ref.classification;
          }
          return String(ref);
        })
        .filter(Boolean);
      
      if (refStrings.length > 0) {
        const result = refStrings.join(' - ');
        extractReferenceCache.set(cacheKey, result);
        return result;
      }
    }
    
    if (reference && typeof reference === 'object') {
      const refText = reference.name || reference.text || reference.grade;
      if (refText) {
        extractReferenceCache.set(cacheKey, refText);
        return refText;
      }
    }
  }
  
  const result = `${bookName} - ${index + 1}`;
  extractReferenceCache.set(cacheKey, result);
  return result;
}

// Ultra-fast hadith processing with content validation and filtering
function processHadithData(data: any, bookName: string): Hadith[] {
  const processingStartTime = Date.now();
  
  // Try cached processed data first
  const processingKey = `processed_${bookName}_${JSON.stringify(data).slice(0, 100)}`;
  if (metadataCache.has(processingKey)) {
    console.log(`⚡ Using cached processing for ${bookName}`);
    return metadataCache.get(processingKey);
  }
  
  let rawHadiths: any[] = [];
  let validHadiths: Hadith[] = [];
  let hadithCounter = 1;
  
  // Extract raw hadith data from different structures
  if (data.hadiths && Array.isArray(data.hadiths)) {
    rawHadiths = data.hadiths;
  }
  else if (data.sections) {
    // Flatten sections structure
    for (const [sectionKey, section] of Object.entries(data.sections)) {
      if (section && typeof section === 'object') {
        for (const [hadithKey, hadith] of Object.entries(section)) {
          if (hadith && typeof hadith === 'object') {
            rawHadiths.push(hadith);
          }
        }
      }
    }
  }
  else if (data.book?.hadiths && Array.isArray(data.book.hadiths)) {
    rawHadiths = data.book.hadiths;
  }
  else {
    // Fallback: find any array in response
    const arrayKeys = Object.keys(data).filter(key => Array.isArray(data[key]));
    if (arrayKeys.length > 0) {
      rawHadiths = data[arrayKeys[0]];
    }
  }
  
  // Process and filter hadiths - only include those with valid content
  for (let index = 0; index < rawHadiths.length; index++) {
    const hadith = rawHadiths[index];
    
    // Extract hadith text and validate
    const hadithText = extractText(hadith);
    if (!hadithText) {
      // Skip this hadith if no valid text content
      console.log(`⚠️ Skipping hadith ${index + 1} - no valid text content`);
      continue;
    }
    
    // Extract narrator (optional - can be null)
    const narrator = extractNarrator(hadith) || 'راوي غير معروف';
    
    // Extract reference
    const reference = extractReference(hadith, bookName, index) || `${bookName} - ${hadithCounter}`;
    
    // Create valid hadith object
    validHadiths.push({
      hadithId: hadithCounter++,
      hadithText: hadithText,
      narrator: narrator,
      reference: reference
    });
  }
  
  // Cache processed data for reuse
  metadataCache.set(processingKey, validHadiths);
  
  const processingTime = Date.now() - processingStartTime;
  const filteredCount = rawHadiths.length - validHadiths.length;
  
  console.log(`⚡ Processed ${rawHadiths.length} raw hadiths -> ${validHadiths.length} valid hadiths (filtered out ${filteredCount}) in ${processingTime}ms`);
  
  return validHadiths;
}

// Function to preload popular books (can be called internally but not exported)
async function preloadPopularBooks(): Promise<void> {
  console.log('🚀 Preloading popular hadith books...');
  
  for (const bookKey of POPULAR_BOOKS) {
    const cacheKey = `hadith_book_${BOOK_MAPPING[bookKey].id}`;
    
    // Check if already cached
    if (getCachedData(cacheKey)) {
      console.log(`✅ ${bookKey} already cached`);
      continue;
    }
    
    try {
      console.log(`📥 Preloading ${bookKey}...`);
      const response = await fetchWithParallelCDNs(bookKey);
      const data = await response.json();
      
      const bookName = BOOK_MAPPING[bookKey].name;
      const processedHadiths = processHadithData(data, bookName);
      
      const cacheData = {
        hadiths: processedHadiths,
        total: processedHadiths.length,
        bookName: bookName
      };
      
      setCachedData(cacheKey, cacheData, POPULAR_BOOKS_TTL);
      console.log(`✅ Preloaded ${bookKey} with ${processedHadiths.length} hadiths`);
      
    } catch (error) {
      console.error(`❌ Failed to preload ${bookKey}:`, error);
    }
  }
  
  console.log('🎉 Popular books preloading completed');
}

// Main GET handler with advanced caching
export async function GET(request: Request) {
  const startTime = Date.now();
  const { searchParams } = new URL(request.url);
  const bookId = searchParams.get('bookId');
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10; // Default to 10 hadiths per page
  const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0;

  try {
    if (bookId) {
      // Enhanced cache key with pagination
      const cacheKey = `hadith_book_${bookId}_${limit || 'all'}_${offset}`;
      const baseCacheKey = `hadith_book_${bookId}`;
      
      // Multi-tier cache check
      let cachedData = getCachedData(cacheKey);
      if (!cachedData) {
        cachedData = getCachedData(baseCacheKey);
      }
      
      if (cachedData) {
        const cacheAge = Date.now() - cachedData.timestamp;
        console.log(`⚡ CACHE HIT for book ${bookId} (age: ${Math.round(cacheAge/1000)}s, accessed: ${cachedData.accessCount} times)`);
        
        // Calculate pagination metadata
        const totalHadiths = cachedData.data.total;
        const currentPage = Math.floor(offset / limit) + 1;
        const totalPages = Math.ceil(totalHadiths / limit);
        
        // Apply pagination - always paginate for consistent response structure
        const hadiths = cachedData.data.hadiths.slice(offset, offset + limit);
        
        return NextResponse.json({ 
          hadiths,
          success: true,
          total: totalHadiths,
          bookName: cachedData.data.bookName,
          cached: true,
          cacheAge: Math.round(cacheAge / 1000),
          pagination: {
            currentPage,
            totalPages,
            limit,
            offset,
            hasNextPage: currentPage < totalPages,
            hasPreviousPage: currentPage > 1
          },
          performance: {
            responseTime: Date.now() - startTime,
            cacheHit: true
          }
        });
      }

      // Find book key by ID
      const bookKey = Object.keys(BOOK_MAPPING).find(key => BOOK_MAPPING[key].id === parseInt(bookId));
      
      if (!bookKey) {
        return NextResponse.json(
          { 
            error: 'Book not found',
            message: 'Invalid book ID provided',
            success: false 
          }, 
          { status: 404 }
        );
      }

      console.log(`🚀 CACHE MISS - Fetching hadiths for book: ${bookKey}`);
      const fetchStartTime = Date.now();
      
      try {
        console.log(`📡 Parallel fetch from multiple CDNs for ${bookKey}`);
        const response = await fetchWithParallelCDNs(bookKey);
        const data = await response.json();
        
        const fetchTime = Date.now() - fetchStartTime;
        console.log(`📥 Data fetched in ${fetchTime}ms`);
        
        // Process the data with caching
        const processingStartTime = Date.now();
        const bookName = BOOK_MAPPING[bookKey].name;
        const processedHadiths = processHadithData(data, bookName);
        const processingTime = Date.now() - processingStartTime;
        
        // Cache the processed data with smart TTL
        const cacheData = {
          hadiths: processedHadiths,
          total: processedHadiths.length,
          bookName: bookName
        };
        
        // Use longer TTL for popular books
        const isPopular = POPULAR_BOOKS.includes(bookKey);
        setCachedData(baseCacheKey, cacheData, isPopular ? POPULAR_BOOKS_TTL : CACHE_TTL);
        
        // Calculate pagination metadata
        const totalHadiths = processedHadiths.length;
        const currentPage = Math.floor(offset / limit) + 1;
        const totalPages = Math.ceil(totalHadiths / limit);
        
        // Apply pagination - always paginate for consistent response structure
        const hadiths = processedHadiths.slice(offset, offset + limit);
        
        // Cache paginated result for this specific page
        const paginatedCacheKey = `hadith_book_${bookId}_${limit}_${offset}`;
        setCachedData(paginatedCacheKey, { ...cacheData, hadiths });
        
        const totalResponseTime = Date.now() - startTime;
        console.log(`✅ Complete response generated in ${totalResponseTime}ms (fetch: ${fetchTime}ms, processing: ${processingTime}ms)`);
        console.log(`📊 Book statistics: ${totalHadiths} total hadiths, returning page ${currentPage}/${totalPages} (${hadiths.length} hadiths)`);
        
        return NextResponse.json({ 
          hadiths,
          success: true,
          total: totalHadiths,
          bookName: bookName,
          cached: false,
          pagination: {
            currentPage,
            totalPages,
            limit,
            offset,
            hasNextPage: currentPage < totalPages,
            hasPreviousPage: currentPage > 1
          },
          performance: {
            responseTime: totalResponseTime,
            cacheHit: false,
            fetchTime,
            processingTime
          }
        });
        
      } catch (error) {
        console.error(`❌ Failed to fetch ${bookKey}:`, error);
        throw error;
      }
      
    } else {
      // Cache book list separately with metadata
      const bookListKey = 'book_list_all';
      const cachedBooks = bookListCache.get(bookListKey);
      
      if (cachedBooks && Date.now() - cachedBooks.timestamp < METADATA_TTL) {
        console.log(`⚡ Returning cached book list (age: ${Math.round((Date.now() - cachedBooks.timestamp)/1000)}s)`);
        return NextResponse.json({ 
          ...cachedBooks.data,
          cached: true,
          performance: {
            responseTime: Date.now() - startTime,
            cacheHit: true
          }
        });
      }
      
      // Generate book list with enhanced metadata
      const books: HadithBook[] = Object.keys(BOOK_MAPPING).map(key => ({
        bookId: BOOK_MAPPING[key].id,
        bookName: BOOK_MAPPING[key].name,
        bookDescription: BOOK_MAPPING[key].description
      }));
      
      const responseData = { 
        books: books,
        success: true,
        total: books.length
      };
      
      // Cache book list
      bookListCache.set(bookListKey, {
        data: responseData,
        timestamp: Date.now()
      });
      
      const responseTime = Date.now() - startTime;
      console.log(`📚 Generated book list in ${responseTime}ms`);
      
      return NextResponse.json({ 
        ...responseData,
        cached: false,
        performance: {
          responseTime,
          cacheHit: false
        }
      });
    }
  } catch (error) {
    const responseTime = Date.now() - startTime;
    console.error(`❌ Error after ${responseTime}ms:`, error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch data',
        message: error instanceof Error ? error.message : 'Unknown error',
        success: false,
        performance: {
          responseTime,
          cacheHit: false
        }
      }, 
      { status: 500 }
    );
  }
}
