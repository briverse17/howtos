import { ArticlesType } from "../../../types"
import { MenuItem } from "../../atoms/MenuItem"
import { useEffect, useState } from "react"

type Props = {
    articles: ArticlesType
    setContent: React.Dispatch<React.SetStateAction<string | null>>
    setError: React.Dispatch<React.SetStateAction<string | null>>
}

export function Menu(props: Props) {
    const [active, setActive] = useState<string | null>(null)
    const [hovered, setHovered] = useState<string | null>(null)

    useEffect(() => {
        if (!active) {
            setActive(Object.keys(props.articles)[0])
        }
    }, [props])

    useEffect(() => {
        const fetchContent = async () => {
            try {
                if (active) {
                    const response = await fetch(
                        `https://raw.githubusercontent.com/briverse17/howtos/content/${active}`
                    )
                    const content = await response.text()
                    if (!response.ok) {
                        throw new Error(`Error: ${content}`)
                    }
                    props.setContent(content)
                    props.setError(null)
                }
            } catch (error) {
                props.setError((error as Error).message)
            }
        }
        fetchContent()
    }, [active])

    return (
        <div className="w-1/5 border-[1px] rounded-2xl border-gray-300">
            <div className="px-2 py-2 grid gap-2 text-sm">
                {Object.entries(props.articles).map(([key, value]) => (
                    <div key={key}>
                        <MenuItem
                            id={key}
                            value={value}
                            active={active}
                            hovered={hovered}
                            onClick={setActive}
                            onMouseEnter={setHovered}
                            onMouseLeave={setHovered}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
