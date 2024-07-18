import { useEffect, useState } from "react";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArticlesType } from "../../types";
import Top from "../Top/Top";

type Props = {
    articles: ArticlesType
}

function Home(props: Props) {
    const articles = props.articles

    const [fileName, setFileName] = useState<string | null>(Object.keys(articles)[0]);
    const [fileContent, setFileContent] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await fetch(`https://raw.githubusercontent.com/briverse17/howtos/develop/content/${fileName}`);
                const content = await response.text();
                if (!response.ok) {
                    throw new Error(`Error: ${content}`);
                }
                setFileContent(content)
                setError(null)
            } catch (error) {
                setError((error as Error).message);
            }
        }
        fetchContent()
    }, [fileName])

    return (
        <div className="container mx-auto">
            <Top></Top>
            <div className="flex h-screen">
                <div className="w-1/4 border-r border-gray-300 p-4">
                    <ul>
                        {Object.entries(articles).map(([key, value]) => (
                            <li key={key} className="cursor-pointer p-2 hover:bg-gray-200" onClick={() => { setFileName(key) }}>{value}</li>
                        ))}
                    </ul>
                </div>
                <div className="w-3/4 p-4">
                    <div className="article-content">
                        <Markdown remarkPlugins={[remarkGfm]}>{error ? error : fileContent}</Markdown>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home;