import { useEffect, useState } from "react"
import { ArticlesType } from "../../../types"
import { Menu } from "../../mocules/Menu"
import { Viewer } from "../../mocules/Viewer"


export function Container() {
    const [articles, setArticles] = useState<ArticlesType>(Object())
    const [content, setContent] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch(
                    `https://raw.githubusercontent.com/briverse17/howtos/content/contents.json`
                );
                const content = await response.json()
                if (!response.ok) {
                    throw new Error(`Error: ${content}`)
                }
                setArticles(content)
                setError(null)
            } catch (error) {
                setError((error as Error).message)
            }
        }
        fetchArticles()
    }, [])


    return (
        <div className="container flex mx-auto my-2 max-h-[calc(100vh-6rem)]">
            <Menu articles={articles} setContent={setContent} setError={setError} />
            <Viewer content={content ? content : error} />
        </div >
    )
}
