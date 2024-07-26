import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

type Props = {
  content: string | null;
};

function ViewerInner(props: Props) {
  return (
    <div className="markdown-body px-4 md:px-8 py-2 min-h-full">
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        remarkRehypeOptions={{ passThrough: ['link'] }}
      >
        {props.content}
      </Markdown>
    </div>
  );
}

export function Viewer(props: Props) {
  return (
    <div className="order-1 md:order-2 w-[96vw] md:w-4/5 h-[95vh] md:h-full mx-auto rounded-t-2xl md:rounded-tl-none md:rounded-r-2xl md:border-y-2 md:border-r-2 md:border-gray-300 overflow-auto">
      <ViewerInner {...props} />
    </div>
  );
}
