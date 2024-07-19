import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"

type Props = {
    content: string | null
}

function ViewerInner(props: Props) {
    return (
        <div className="markdown-body px-8 py-2 min-h-[calc(100vh-6rem)]">
            <Markdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                remarkRehypeOptions={{ passThrough: ['link'] }}
            >
                {props.content}
            </Markdown>
        </div>
    )
}

export function Viewer(props: Props) {
    return (
        <div className="mx-2 w-4/5 rounded-2xl overflow-auto">
            <ViewerInner {...props} />
        </div>
    )
}
