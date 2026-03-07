import { useEffect } from 'react';
import { ParsedFrontmatter } from '../../../utils/frontmatter';
import { MenuItem } from '../../atoms/MenuItem';
import { Search } from '../Search/Search';

type Props = {
  articles: Record<string, ParsedFrontmatter>;
  active: string | null;
  hovered: string | null;
  setActive: React.Dispatch<React.SetStateAction<string | null>>;
  setHovered: React.Dispatch<React.SetStateAction<string | null>>;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
};

export function Menu({ articles, active, hovered, setActive, setHovered, searchTerm, setSearchTerm }: Props) {

  useEffect(() => {
    if (!active && Object.keys(articles).length > 0) {
      setActive(Object.keys(articles)[0]);
    }
  }, [articles, active, setActive]);

  const filteredArticles = Object.entries(articles).filter(([key, value]) => {
    const searchLow = searchTerm.toLowerCase();
    const titleMatch = (value.data.title || '').toLowerCase().includes(searchLow);
    const descMatch = (value.data.description || '').toLowerCase().includes(searchLow);
    const tagsMatch = (value.data.tags || []).some(tag => tag.toLowerCase().includes(searchLow));
    const keyMatch = key.toLowerCase().includes(searchLow);

    return keyMatch || titleMatch || descMatch || tagsMatch;
  });

  return (
    <div className="flex flex-col w-full md:w-[30%] lg:w-1/4 min-w-[300px] border-b-8 md:border-b-0 md:border-r-8 border-foreground bg-background shrink-0 h-[45vh] md:h-full overflow-hidden">
      <Search value={searchTerm} onChange={setSearchTerm} />
      <div className="flex-1 overflow-y-auto">
        {filteredArticles.map(([key, value]) => (
          <MenuItem
            key={key}
            id={key}
            value={value}
            active={active}
            hovered={hovered}
            onClick={setActive}
            onMouseEnter={setHovered}
            onMouseLeave={setHovered}
          />
        ))}
        {filteredArticles.length === 0 && (
          <div className="p-6 font-mono font-black text-2xl uppercase text-foreground/20 text-center">
            NOTHING FOUND.
          </div>
        )}
      </div>
    </div>
  );
}
