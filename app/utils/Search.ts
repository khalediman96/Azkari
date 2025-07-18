// utils/search.ts
import FlexSearch, { Document as FlexSearchDocument } from "flexsearch";

export interface DhikrItem {
  main: string;
  secondary: string;
  reward: string;
  repetitions: number;
}

export interface CategoryContent {
  title: string;
  description: string;
  content: DhikrItem[];
}

export interface ContentMap {
  [key: string]: CategoryContent;
}

export function createSearchIndex(contentMap: ContentMap) {
  // Create a document index with proper typing
  const index = new FlexSearch.Document<{
    id: string;
    category: string;
    categoryTitle: string;
    main: string;
    secondary: string;
    reward: string;
    combined: string;
  }>({
    document: {
      id: "id",
      index: ["main", "secondary", "reward", "combined"],
      store: ["main", "secondary", "reward", "category", "categoryTitle"],
    },
    tokenize: "forward",
  });

  // Index all content
  Object.entries(contentMap).forEach(([categoryKey, category]) => {
    category.content.forEach((item, itemIndex) => {
      const docId = `${categoryKey}-${itemIndex}`;
      
      index.add({
        id: docId,
        category: categoryKey,
        categoryTitle: category.title,
        main: item.main,
        secondary: item.secondary,
        reward: item.reward,
        combined: `${item.main} ${item.secondary} ${item.reward}`,
      });
    });
  });

  return index;
}

export function search(
  index: FlexSearchDocument<{
    id: string;
    category: string;
    categoryTitle: string;
    main: string;
    secondary: string;
    reward: string;
    combined: string;
  }>, 
  query: string
) {
  const results = index.search(query, {
    limit: 20,
    enrich: true,
    suggest: true,
    field: ["main", "secondary", "reward", "combined"],
  });

  // Process and deduplicate results
  const uniqueResults = results
    .flatMap((fieldResults) => fieldResults.result)
    .reduce((unique, result) => {
      if (!unique.some((item) => item.id === String(result.id))) {
        unique.push({ ...result, id: String(result.id) });
      }
      return unique;
    }, [] as Array<{ id: string; doc: any }>);

  return uniqueResults;
}