import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

import { ParsedFrontmatter } from '../../../utils/frontmatter';

type Props = {
  article: ParsedFrontmatter | null;
  error: string | null;
};

export function Viewer({ article, error }: Props) {
  return (
    <div className="flex-1 h-[50vh] md:h-full overflow-y-auto bg-background p-6 md:p-16 relative">
      <div className="markdown-body max-w-4xl mx-auto brutal-markdown font-mono">
        {error && (
          <div className="bg-accent text-black font-black p-4 mb-8 uppercase text-xl border-4 border-foreground">
            {error}
          </div>
        )}

        {article && (
          <div className="mb-16 border-b-8 border-foreground pb-8">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-4">
              {article.data.title}
            </h1>
            {article.data.description && (
              <p className="text-xl md:text-2xl font-bold opacity-75 mb-4">
                {article.data.description}
              </p>
            )}
            <div className="flex flex-wrap gap-2 uppercase font-bold text-xs mt-4">
              <span className="bg-foreground text-background px-2 py-1">
                {article.data.category || 'Uncategorized'}
              </span>
              {article.data.date && (
                <span className="border-2 border-foreground px-2 py-1">
                  {article.data.date}
                </span>
              )}
              {article.data.tags?.map((tag, idx) => (
                <span key={idx} className="border-2 border-foreground px-2 py-1 text-accent border-accent">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <Markdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          remarkRehypeOptions={{ passThrough: ['link'] }}
        >
          {article ? article.content : '> _LOADING ARCHIVES..._'}
        </Markdown>
      </div>
    </div>
  );
}
