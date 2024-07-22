import { SetStateAction, useEffect, useState } from "react"
import { ArticlesType } from "../../../types"
import { Menu } from "../../mocules/Menu"
import { Viewer } from "../../mocules/Viewer"


export function Container() {
    const [articles, setArticles] = useState<ArticlesType>(Object())
    const [active, setActive] = useState<string | null>(null)
    const [hovered, setHovered] = useState<string | null>(null)
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
        <div className="container flex flex-col md:flex-row mx-auto h-[90vh] md:h-[89vh]">
            <Menu
                articles={articles}
                active={active}
                hovered={hovered}
                setActive={setActive}
                setHovered={setHovered}
                setContent={setContent}
                setError={setError}
            />
            <Viewer content={content ? content : error} />
        </div >
    )
}
