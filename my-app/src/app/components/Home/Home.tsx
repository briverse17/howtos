import { useEffect, useState } from "react"
import { ArticlesType } from "../../types"
import Top from "../Top/Top"
import Bottom from "../Bottom/Bottom"
import MenuItem from "../MenuItem/MenuItem"
import { Viewer } from "../Viewer"

type Props = {
    articles: ArticlesType
}

function Home(props: Props) {
    const first = Object.keys(props.articles)[0]
    const [active, setActive] = useState<string>(first)
    const [hovered, setHovered] = useState<string | null>(null)
    const [content, setContent] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await fetch(
                    `https://raw.githubusercontent.com/briverse17/howtos/content/${active}`
                )
                const content = await response.text()
                if (!response.ok) {
                    throw new Error(`Error: ${content}`)
                }
                setContent(content)
                setError(null)
            } catch (error) {
                setError((error as Error).message)
            }
        }
        fetchContent()
    }, [active])

    return (
        <div>
            <Top></Top>
            <div className="container flex mx-auto my-2 max-h-[calc(100vh-6rem)]">
                <div className="w-1/5 border-[1px] rounded-2xl border-gray-300">
                    <div className="px-2 py-2 grid gap-2 text-sm">
                        {Object.entries(props.articles).map(([key, value]) => (
                            <MenuItem
                                id={key}
                                value={value}
                                active={active}
                                hovered={hovered}
                                onClick={setActive}
                                onMouseEnter={setHovered}
                                onMouseLeave={setHovered}
                            />
                        ))}
                    </div>
                </div>
                <Viewer content={content ? content : error} />
            </div >
            <Bottom></Bottom>
        </div >
    )
}

export default Home
