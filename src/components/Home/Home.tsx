import Top from "../Top/Top"
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArticlesType } from "../../types"

function Home(articles: ArticlesType) {
    function showContent(articleId: string) {
        // Hide all article content
        const contents = document.querySelectorAll('.article-content');
        contents.forEach(content => {
            content.classList.add('hidden');
        });

        // Show the selected article content
        const selectedContent = document.getElementById(articleId);
        if (selectedContent) {
            selectedContent.classList.remove('hidden');
        }
    }

    const articles1 = {
        "article1": "# A paragraph with *emphasis* and **strong importance**\n\n> A block quote with ~strikethrough~ and a URL: <https://reactjs.org>.\n\n* Lists\n* [ ] todo\n* [x] done\n\nA table:\n\n| a | b |\n| - | - |\n"
    }

    return (
        <div className="container mx-auto">
            <Top></Top>
            <div className="flex h-screen">
                <div className="w-1/4 border-r border-gray-300 p-4">
                    <ul>
                        <li className="cursor-pointer p-2 hover:bg-gray-200" onClick={() => { showContent("article1") }}>Article 1</li>
                        <li className="cursor-pointer p-2 hover:bg-gray-200" onClick={() => { showContent("article2") }}>Article 2</li>
                        <li className="cursor-pointer p-2 hover:bg-gray-200" onClick={() => { showContent("article3") }}>Article 3</li>
                    </ul>
                </div>
                <div className="w-3/4 p-4">
                    <div id="article1" className="article-content hidden">
                        <Markdown remarkPlugins={[remarkGfm]}>{articles1["article1"]}</Markdown>
                    </div>
                    <div id="article2" className="article-content hidden">
                        <h2>Article 2</h2>
                        <p>This is the content of Article 2.</p>
                    </div>
                    <div id="article3" className="article-content hidden">
                        <h2>Article 3</h2>
                        <p>This is the content of Article 3.</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home;