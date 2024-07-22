import Markdown from "react-markdown"
import strip from 'strip-markdown'

import { useEffect } from "react"
import { ArticlesType } from "../../../types"
import { MenuItem } from "../../atoms/MenuItem"

type Props = {
    articles: ArticlesType
    active: string | null
    hovered: string | null
    setActive: React.Dispatch<React.SetStateAction<string | null>>
    setHovered: React.Dispatch<React.SetStateAction<string | null>>
    setContent: React.Dispatch<React.SetStateAction<string | null>>
    setError: React.Dispatch<React.SetStateAction<string | null>>
}

export function Menu(props: Props) {
    useEffect(() => {
        if (!props.active) {
            props.setActive(Object.keys(props.articles)[0])
        }
    }, [props])

    useEffect(() => {
        const fetchContent = async () => {
            try {
                if (props.active) {
                    const response = await fetch(
                        `https://raw.githubusercontent.com/briverse17/howtos/content/${props.active}`
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
    }, [props.active])

    return (
        <div className="order-2 md:order-1 w-[96vw] md:w-1/5 h-[5vh] md:h-full mx-auto border-2 border-t-0 md:border-t-2 md:border-r-0 border-gray-300 rounded-b-2xl md:rounded-b-none md:rounded-l-2xl">
            <select
                className="md:hidden w-full h-[5vh] bg-gray-300 p-2 rounded-b-xl md:rounded-b-none md:rounded-l-2xl cursor-pointer"
                value={props.active ? props.active : ""}
                onChange={(e) => props.setActive(e.target.value)}
            >
                {Object.entries(props.articles).map(([key, value]) => (
                    <option key={key} value={key}>
                        <MenuItem
                            id={key}
                            value={value}
                            active={props.active}
                            hovered={props.hovered}
                            onClick={props.setActive}
                            onMouseEnter={props.setHovered}
                            onMouseLeave={props.setHovered}
                        />
                    </option>
                ))}
            </select>
            <div className="hidden md:grid pl-1 pb-1 gap-1 text-sm">
                {Object.entries(props.articles).map(([key, value]) => (
                    <div key={key}>
                        <MenuItem
                            id={key}
                            value={value}
                            active={props.active}
                            hovered={props.hovered}
                            onClick={props.setActive}
                            onMouseEnter={props.setHovered}
                            onMouseLeave={props.setHovered}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
