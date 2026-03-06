'use client'
import { useEffect, useState } from 'react';
import { ArticlesType } from '../../../types/Articles';
import { parseFrontmatter, ParsedFrontmatter } from '../../../utils/frontmatter';
import { Menu } from '../../mocules/Menu';
import { Viewer } from '../../mocules/Viewer';

export function Container() {
  const [articles, setArticles] = useState<Record<string, ParsedFrontmatter>>({});
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticlesAndMetadata = async () => {
      try {
        // 1. Fetch file map
        const response = await fetch(
          `https://raw.githubusercontent.com/briverse17/howtos/content/contents.json`
        );
        const articlesMap: ArticlesType = await response.json();

        if (!response.ok) {
          throw new Error(`Error: ${articlesMap}`);
        }

        // 2. Fetch all markdowns in parallel to eliminate waterfalls
        const files = Object.entries(articlesMap);
        const parsedCache: Record<string, ParsedFrontmatter> = {};

        await Promise.all(
          files.map(async ([key, fileName]) => {
            const raw = await fetch(
              `https://raw.githubusercontent.com/briverse17/howtos/content/${key}`
            );
            const markdownStr = await raw.text();
            parsedCache[key] = parseFrontmatter(markdownStr, fileName);
          })
        );

        setArticles(parsedCache);
        setError(null);
      } catch (error) {
        setError((error as Error).message);
      }
    };
    fetchArticlesAndMetadata();
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-full flex-1 overflow-hidden">
      <Menu
        articles={articles}
        active={active}
        hovered={hovered}
        setActive={setActive}
        setHovered={setHovered}
      />
      <Viewer article={active ? articles[active] : null} error={error} />
    </div>
  );
}
