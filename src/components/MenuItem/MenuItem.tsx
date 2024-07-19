import Markdown from "react-markdown"
import strip from 'strip-markdown'

type Props = {
    id: string
    value: string
    active: string
    hovered: string | null
    onClick: React.Dispatch<React.SetStateAction<string>>
    onMouseEnter: React.Dispatch<React.SetStateAction<string | null>>
    onMouseLeave: React.Dispatch<React.SetStateAction<string | null>>
}

function MenuItem(props: Props) {
    const text = (
        <Markdown
            remarkPlugins={[strip]}
        >
            {props.value}
        </Markdown>
    )
    return (
        <div
            id={props.id}
            className="cursor-pointer px-2 rounded-md"
            style={{
                backgroundColor: props.id === props.hovered ? "rgb(229 231 235)" : "white",
                fontWeight: props.id === props.active ? "bold" : "normal"
            }}
            onClick={() => props.onClick(props.id)}
            onMouseEnter={() => props.onMouseEnter(props.id)}
            onMouseLeave={() => props.onMouseLeave(null)}
        >
            {text}
        </div>
    )
}

export default MenuItem;