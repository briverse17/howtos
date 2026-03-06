import Markdown from 'react-markdown';
import strip from 'strip-markdown';

type Props = {
  id: string;
  value: string;
  active: string | null;
  hovered: string | null;
  onClick: React.Dispatch<React.SetStateAction<string | null>>;
  onMouseEnter: React.Dispatch<React.SetStateAction<string | null>>;
  onMouseLeave: React.Dispatch<React.SetStateAction<string | null>>;
};

export function MenuItem({ id, value, active, hovered, onClick, onMouseEnter, onMouseLeave }: Props) {
  const text = <Markdown remarkPlugins={[strip]}>{value}</Markdown>;
  const isActive = id === active;
  const isHovered = id === hovered;

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
        className="text-left w-full uppercase tracking-tighter text-sm md:text-lg leading-tight"
        onClick={() => onClick(id)}
        onMouseEnter={() => onMouseEnter(id)}
        onMouseLeave={() => onMouseLeave(null)}
      >
        {text}
      </button>
    </div>
  );
}
