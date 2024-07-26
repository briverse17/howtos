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

export function MenuItem(props: Props) {
  const text = <Markdown remarkPlugins={[strip]}>{props.value}</Markdown>;
  return (
    <button
      className="cursor-pointer px-2 py-1 rounded-l-lg"
      style={{
        backgroundColor:
          props.id === props.hovered || props.id === props.active
            ? 'RGB(13, 17, 23)'
            : 'white',
        color:
          props.id === props.hovered || props.id === props.active
            ? 'white'
            : 'black',
        fontWeight: props.id === props.active ? 'bold' : 'normal',
      }}
      onClick={() => props.onClick(props.id)}
      onMouseEnter={() => props.onMouseEnter(props.id)}
      onMouseLeave={() => props.onMouseLeave(null)}
    >
      {text}
    </button>
  );
}
