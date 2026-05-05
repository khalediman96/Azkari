// components/DhikrSearch.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import contentMap from "@/app/[slug]/data";
import { createSearchIndex, search } from "@/app/utils/Search";

export default function DhikrSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<
    Array<{
      id: string;
      doc: {
        main: string;
        secondary: string;
        reward: string;
        category: string;
        categoryTitle: string;
      };
    }>
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  // Create search index only once
  const index = useMemo(() => createSearchIndex(contentMap), []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const found = search(index, query);
      setResults(found);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [query, index]);

  const handleResultClick = (category: string, itemId: string) => {
    // Navigate to the corresponding page with hash for the specific item
    router.push(`/${category}#${itemId}`);
  };

  return (
    <div className="w-full">
      <div className="relative w-full">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث في الأذكار..."
          className="w-full p-4 text-gray-200 pl-12 text-lg dark:border rounded-md focus:outline-none focus:ring-1 focus:ring-[#177c52] text-right bg-[#eef7f0]/50 dark:bg-[#0f3422]/80 border border-[#c27c18]/20 dark:border-[#177c52]/40 rounded-xl"
          dir="rtl"
        />
        <div className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-[#177c52] p-2 rounded-sm">
          <Search className="h-5 w-5 text-white" />
        </div>
        {isLoading && (
          <div className="absolute top-4 left-12 text-gray-100" dir="rtl">
            جاري البحث...
          </div>
        )}
      </div>

      {results.length > 0 && (
        <div className="mt-6 space-y-4 w-full">
          {results.map((result) => {
            const [category, itemIndex] = result.id.split("-");
            return (
              <div
                key={result.id}
                className="p-4 rounded-lg shadow-md border border-gray-100 cursor-pointer transition-colors w-full"
                dir="rtl"
                onClick={() => handleResultClick(category, `item-${itemIndex}`)}
              >
                <div className="text-sm text-[#177c52] dark:text-[#47b484] mb-1">
                  {result.doc.categoryTitle}
                </div>
                {result.doc.main.trim() && (
                  <h3 className="text-xl font-bold mb-2">{result.doc.main}</h3>
                )}
                <p className="mb-2">{result.doc.secondary}</p>
                {result.doc.reward.trim() && (
                  <div className="mt-2 p-2 rounded">
                    <p className="text-[#c27c18] dark:text-[#d4a843]">{result.doc.reward}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {query && !isLoading && results.length === 0 && (
        <div className="mt-4 text-center text-gray-500" dir="rtl">
          لا توجد نتائج لـ "{query}"
        </div>
      )}
    </div>
  );
}