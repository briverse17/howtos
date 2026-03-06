import { ParsedFrontmatter } from '../../../utils/frontmatter';

type Props = {
  id: string;
  value: ParsedFrontmatter;
  active: string | null;
  hovered: string | null;
  onClick: React.Dispatch<React.SetStateAction<string | null>>;
  onMouseEnter: React.Dispatch<React.SetStateAction<string | null>>;
  onMouseLeave: React.Dispatch<React.SetStateAction<string | null>>;
};

export function MenuItem({ id, value, active, hovered, onClick, onMouseEnter, onMouseLeave }: Props) {
  const isActive = id === active;
  const isHovered = id === hovered;
  const { title, tags, category } = value.data;

  return (
    <div
      className={`
        cursor-pointer px-4 py-4 border-b-4 border-foreground font-mono transition-transform duration-150 ease-out
        ${isActive ? 'bg-accent text-black font-black translate-x-2' : ''}
        ${!isActive && isHovered ? 'bg-foreground text-background translate-x-1' : ''}
        ${!isActive && !isHovered ? 'bg-background text-foreground font-bold' : ''}
      `}
    >
      <button
        className="text-left w-full uppercase tracking-tighter leading-tight flex flex-col gap-2"
        onClick={() => onClick(id)}
        onMouseEnter={() => onMouseEnter(id)}
        onMouseLeave={() => onMouseLeave(null)}
      >
        <span className="text-xs uppercase font-bold opacity-50">{category}</span>
        <span className="text-sm md:text-lg">{title}</span>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {tags.map((tag, idx) => (
              <span key={idx} className="text-[10px] md:text-xs px-1 border border-current font-bold bg-transparent">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </button>
    </div>
  );
}
