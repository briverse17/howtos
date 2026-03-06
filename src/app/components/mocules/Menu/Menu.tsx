import { useEffect, useState } from 'react';
import { ArticlesType } from '../../../types';
import { MenuItem } from '../../atoms/MenuItem';
import { Search } from '../Search/Search';

type Props = {
  articles: ArticlesType;
  active: string | null;
  hovered: string | null;
  setActive: React.Dispatch<React.SetStateAction<string | null>>;
  setHovered: React.Dispatch<React.SetStateAction<string | null>>;
  setContent: React.Dispatch<React.SetStateAction<string | null>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};

export function Menu({ articles, active, hovered, setActive, setHovered, setContent, setError }: Props) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!active && Object.keys(articles).length > 0) {
      setActive(Object.keys(articles)[0]);
    }
  }, [articles, active, setActive]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        if (active) {
          const response = await fetch(
            `https://raw.githubusercontent.com/briverse17/howtos/content/${active}`
          );
          const responseText = await response.text();
          if (!response.ok) {
            throw new Error(`Error: ${responseText}`);
          }
          setContent(responseText);
          setError(null);
        }
      } catch (err) {
        setError((err as Error).message);
      }
    };
    fetchContent();
  }, [active, setContent, setError]);

  const filteredArticles = Object.entries(articles).filter(([key, value]) => {
    return key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      value.toLowerCase().includes(searchTerm.toLowerCase());
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
