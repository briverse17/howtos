import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

type Props = {
  content: string | null;
};

export function Viewer(props: Props) {
  return (
    <div className="flex-1 h-[50vh] md:h-full overflow-y-auto bg-background p-6 md:p-16 relative">
      <div className="markdown-body max-w-4xl mx-auto brutal-markdown font-mono">
        <Markdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          remarkRehypeOptions={{ passThrough: ['link'] }}
        >
          {props.content || '> _LOADING ARCHIVES..._'}
        </Markdown>
      </div>
    </div>
  );
}
